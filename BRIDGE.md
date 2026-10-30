# Bridge

Shared rulebook and handoff notes for AI assistants working in this
repository: Grok bots, Claude, Gemini, Copilot, and ChatGPT/Codex.
Read this before you edit anything. When you finish a task, add a short
entry to the handoff log so the next assistant can pick up from here.

## 1. What this repo is

This is mr-robot77's portfolio. It is a Jekyll site. GitHub Pages builds
it from the `main` branch and serves the live site at
https://mr-robot77.github.io/.

Content:

- `_data/` holds the structured profile data: `education.yml`,
  `experience.yml`, `projects.yml`, and `skills.yml`. The portfolio
  layout reads these files.
- `projects/` holds one folder per project write-up.
- `index.md` is the homepage. Photos and thumbnails are in `images/`.
  A sample PDF is in `pdf/`.

Look and layout:

- `_layouts/` has the page templates: `default.html`, `portfolio.html`,
  and `project.html`.
- `assets/` has the custom CSS and JavaScript (`assets/css`,
  `assets/js`). The portfolio layout loads `assets/css/portfolio.css`
  on top of the theme stylesheet.
- `_config.yml` sets `remote_theme` to `pages-themes/minimal` (pinned
  at `v0.2.0`) and lists the `jekyll-remote-theme` plugin. The Minimal
  theme supplies the base styles.

`main` is production. A merge to `main` is what updates the public site.

This file (`BRIDGE.md`) is listed under `exclude` in `_config.yml` so
GitHub Pages does not publish it. Pages enables
`jekyll-optional-front-matter`, which would otherwise turn a root
Markdown file with no front matter into a public page.

## 2. Ground rules

- Every change goes through a pull request on its own branch. Start the
  branch name with the agent's name, for example `grok/`, `claude/`,
  `gemini/`, or `copilot/`.
- Nothing merges to `main` without the owner's (mr-robot77) yes, and a
  second AI's pull request comment `Approved at <sha>` on the exact
  final commit. A later push cancels that approval.
- No force-push and no history rewrite unless the owner says yes.
- Never commit secrets, API keys, or tokens.
- Never delete or overwrite another agent's instruction files. That
  includes `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and anything under
  `.agents/`, `.claude/`, or `.codex/`. You may read them. Leave them
  as they are.
- Keep live content unchanged unless the owner asks. That means the
  bio, the projects, and the CV.
- Rollback point: branch `backup/pre-redesign-2026-10-30` (and tag
  `pre-redesign-2026-10-30` once it is pushed), at commit `3df1b6d`.

## 3. Site quality checklist

Reviewers check this list before approving a pull request:

- The site builds with GitHub Pages' Jekyll.
- No broken internal links or images.
- Pages work at mobile widths.
- Text contrast meets WCAG 2.2 AA.
- Keyboard focus is visible.
- Motion has a reduced-motion fallback.
- Page weight stays reasonable.

## 4. Handoff log

When you finish, append one or two lines. Include the date, your agent
name, the branch or pull request, what you finished, and what is next.
Add new entries below this note. Do not rewrite older entries.

- 2026-10-30 — Bridge Bot — branch `grok/add-bridge-md`: added
  BRIDGE.md and excluded it from the published site. The full site
  redesign is planned (UX/UI Designer proposes directions, owner picks,
  SWE builds on a `grok/` branch).
