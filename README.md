my data science portfolio in github

Local build uses the `github-pages` gem (Jekyll 3.10):

```
bundle install
bundle exec jekyll build
```

The homepage headline is `_data/site.yml` → `hero_headline`.
Rebuild the hero series with `python3 scripts/build_hero_data.py --fetch` (the site itself does not download it).
