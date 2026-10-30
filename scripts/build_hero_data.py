#!/usr/bin/env python3
"""Build the homepage Bitcoin series from the Quera Project 2 CSV.

The site never downloads this file. Run the script, then commit the JSON.

Source:
  https://github.com/mr-robot77/Quera_G11-Project2
  Problem 1/Q1_data.csv
  BTC rows only. In that file the BTC dates run 2022-09-03 through 2023-09-01.

44-day EMA:
  alpha = 2 / (44 + 1)
  The first 43 closes have no EMA.
  The 44th value is the simple average of the first 44 closes.
  After that, ema = alpha * close + (1 - alpha) * previous ema.
  The average is taken on the full-precision closes. The JSON stores cents.

Usage:
  python3 scripts/build_hero_data.py --fetch
  python3 scripts/build_hero_data.py --csv path/to/Q1_data.csv
"""

import argparse
import csv
import hashlib
import io
import json
import urllib.request
from datetime import date, datetime
from pathlib import Path

SOURCE_URL = (
    "https://raw.githubusercontent.com/mr-robot77/Quera_G11-Project2/"
    "main/Problem%201/Q1_data.csv"
)
SOURCE_PAGE = (
    "https://github.com/mr-robot77/Quera_G11-Project2/blob/main/"
    "Problem%201/Q1_data.csv"
)
SPAN = 44
WINDOW_START = "2022-09-01"
WINDOW_END = "2023-09-30"
ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "assets" / "data" / "btc-hero.json"
YAML_PATH = ROOT / "_data" / "hero.yml"

MONTHS = (
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
)
MONTHS_SHORT = (
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
)


def fetch_csv():
    with urllib.request.urlopen(SOURCE_URL, timeout=60) as response:
        return response.read()


def load_btc_rows(raw):
    text = raw.decode("utf-8-sig")
    reader = csv.DictReader(io.StringIO(text))
    rows = []
    for row in reader:
        if row.get("symbol") != "BTC":
            continue
        stamp = row["time_stamp"][:10]
        rows.append((stamp, float(row["close"])))
    rows.sort(key=lambda item: item[0])
    return rows


def in_window(stamp):
    return WINDOW_START <= stamp <= WINDOW_END


def ema_series(closes):
    alpha = 2 / (SPAN + 1)
    series = [None] * len(closes)
    if len(closes) < SPAN:
        return series, alpha
    seed = sum(closes[:SPAN]) / SPAN
    series[SPAN - 1] = seed
    previous = seed
    for index in range(SPAN, len(closes)):
        previous = alpha * closes[index] + (1 - alpha) * previous
        series[index] = previous
    return series, alpha


def plain_date(iso):
    parsed = datetime.strptime(iso, "%Y-%m-%d").date()
    return f"{parsed.day} {MONTHS[parsed.month - 1]} {parsed.year}"


def short_date(iso):
    parsed = datetime.strptime(iso, "%Y-%m-%d").date()
    return f"{parsed.day} {MONTHS_SHORT[parsed.month - 1]} {parsed.year}"


def money(value):
    return f"${value:,.2f}"


def yaml_quote(value):
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def cents(value):
    return round(value + 1e-9, 2)


def build(raw):
    rows = [row for row in load_btc_rows(raw) if in_window(row[0])]
    if len(rows) < SPAN:
        raise SystemExit(f"Need at least {SPAN} BTC rows in the window, found {len(rows)}")
    dates = [row[0] for row in rows]
    closes = [row[1] for row in rows]
    if dates != sorted(dates):
        raise SystemExit("BTC dates are not sorted")
    if len(dates) != len(set(dates)):
        raise SystemExit("Duplicate BTC dates")
    for earlier, later in zip(dates, dates[1:]):
        gap = (date.fromisoformat(later) - date.fromisoformat(earlier)).days
        if gap != 1:
            raise SystemExit(f"Missing day between {earlier} and {later}")

    emas, alpha = ema_series(closes)
    seed = sum(closes[:SPAN]) / SPAN
    if abs(emas[SPAN - 1] - seed) > 1e-6:
        raise SystemExit("EMA seed does not match the 44-day average")

    points = []
    for stamp, close, moving in zip(dates, closes, emas):
        points.append(
            {
                "date": stamp,
                "close": cents(close),
                "ema": None if moving is None else cents(moving),
            }
        )

    lo_index = min(range(len(closes)), key=closes.__getitem__)
    hi_index = max(range(len(closes)), key=closes.__getitem__)
    ema_start = dates[SPAN - 1]
    aria_label = (
        f"Line chart of Bitcoin daily closing prices from {plain_date(dates[0])} "
        f"to {plain_date(dates[-1])}. The solid mint line is the daily close. "
        f"The dashed coral line is the 44-day exponential moving average, "
        f"which starts on {plain_date(ema_start)} after a 44-day warmup. "
        f"Close began at {money(closes[0])} and ended at {money(closes[-1])}. "
        f"The lowest close was {money(closes[lo_index])} on {plain_date(dates[lo_index])} "
        f"and the highest close was {money(closes[hi_index])} on {plain_date(dates[hi_index])}."
    )
    summary = (
        f"{short_date(dates[0])} to {short_date(dates[-1])}. "
        f"The solid mint line is the close and the dashed coral line is the 44-day EMA. "
        f"Close began at {money(closes[0])} and ended at {money(closes[-1])}. "
        f"Low {money(closes[lo_index])} on {short_date(dates[lo_index])}. "
        f"High {money(closes[hi_index])} on {short_date(dates[hi_index])}. "
        f"The 44-day EMA starts on {short_date(ema_start)} and ended at {money(emas[-1])}."
    )
    payload = {
        "symbol": "BTC",
        "name": "Bitcoin",
        "source": SOURCE_PAGE,
        "source_sha256": hashlib.sha256(raw).hexdigest(),
        "ema_span": SPAN,
        "ema_method": (
            "Simple average of the first 44 closes, then "
            "ema = alpha * close + (1 - alpha) * previous ema, "
            "with alpha = 2 / (span + 1). Values rounded to cents."
        ),
        "date_start": dates[0],
        "date_end": dates[-1],
        "points": points,
    }
    return payload, aria_label, summary, alpha


def write_outputs(payload, aria_label, summary):
    JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    YAML_PATH.parent.mkdir(parents=True, exist_ok=True)
    JSON_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    yaml_text = (
        "# Generated by scripts/build_hero_data.py. Do not edit by hand.\n"
        f"aria_label: {yaml_quote(aria_label)}\n"
        f"summary: {yaml_quote(summary)}\n"
    )
    YAML_PATH.write_text(yaml_text, encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--fetch", action="store_true", help="download the Quera CSV")
    source.add_argument("--csv", type=Path, help="path to a local Q1_data.csv")
    args = parser.parse_args()
    raw = fetch_csv() if args.fetch else args.csv.read_bytes()
    payload, aria_label, summary, alpha = build(raw)
    write_outputs(payload, aria_label, summary)
    print(f"points {len(payload['points'])}")
    print(f"range {payload['date_start']} {payload['date_end']}")
    print(f"alpha {alpha:.6f}")
    print(f"sha256 {payload['source_sha256']}")
    print(aria_label)
    print(summary)
    print(f"wrote {JSON_PATH}")
    print(f"wrote {YAML_PATH}")


if __name__ == "__main__":
    main()
