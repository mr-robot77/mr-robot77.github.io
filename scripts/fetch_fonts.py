#!/usr/bin/env python3
"""Download the latin woff2 files used by the site and check them.

The pages do not call Google Fonts. This script is the build step for
assets/fonts. Each URL is the latin subset at the one weight the CSS uses:
Fraunces 600 (144pt optical size), IBM Plex Sans 400, IBM Plex Mono 400.
"""

import urllib.request
from pathlib import Path

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "fonts"

# Latin files from the Google Fonts CSS API (family + weight + unicode-range: latin).
# Checked 2026-10-30. Re-run if a file fails the weight or cmap checks below.
FILES = (
    (
        "fraunces-600-latin.woff2",
        600,
        "https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58njr1a03gg7S2nfgRYIcaRyTCf7T.woff2",
    ),
    (
        "ibm-plex-sans-400-latin.woff2",
        400,
        "https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llDB6g4.woff2",
    ),
    (
        "ibm-plex-mono-400-latin.woff2",
        400,
        "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2",
    ),
)

# Google Fonts "latin" range, plus the extra marks that range already includes.
ALLOWED = set(range(0x0000, 0x0100))
ALLOWED.update((0x0131, 0x0152, 0x0153, 0x02BB, 0x02BC, 0x02C6, 0x02DA, 0x02DC))
ALLOWED.update((0x0304, 0x0308, 0x0329, 0x2074, 0x20AC, 0x2122, 0x2191, 0x2193))
ALLOWED.update((0x2212, 0x2215, 0xFEFF, 0xFFFD))
ALLOWED.update(range(0x2000, 0x2070))


def codepoints(font):
    found = set()
    for table in font["cmap"].tables:
        found.update(table.cmap)
    return found


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, weight, url in FILES:
        destination = OUT / name
        urllib.request.urlretrieve(url, destination)
        font = TTFont(destination)
        actual = font["OS/2"].usWeightClass
        if actual != weight:
            raise SystemExit(f"{name}: expected weight {weight}, found {actual}")
        extra = sorted(cp for cp in codepoints(font) if cp not in ALLOWED)
        if extra:
            raise SystemExit(f"{name}: codepoints outside latin: {extra[:12]}")
        print(f"{name}: {destination.stat().st_size} bytes, weight {actual}")


if __name__ == "__main__":
    main()
