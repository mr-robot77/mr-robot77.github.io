# Changelog

## 2026-10-30

- Replaced the Minimal remote theme with local layouts, one stylesheet, and a small chart script.
- Homepage headline lives in `_data/site.yml` (`hero_headline`).
- Hero chart uses Bitcoin daily closes from 3 Sep 2022 to 1 Sep 2023 and a 44-day EMA, precomputed in `assets/data/btc-hero.json`.
- Self-hosted Fraunces 600, IBM Plex Sans 400, and IBM Plex Mono 400 (latin woff2) under `assets/fonts`.
- Removed the Google Analytics placeholder, Google Fonts, and the Font Awesome CDN.
- Removed unused template files: `sample_page.md`, `images/dummy_thumbnail.jpg`, `pdf/sample_presentation.pdf`.
- No CV file is in the repo, so there is no Download CV link. `a.cv-link:hover` still thickens the underline.
