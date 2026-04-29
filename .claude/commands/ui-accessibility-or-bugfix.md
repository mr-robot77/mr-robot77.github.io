---
name: ui-accessibility-or-bugfix
description: Workflow command scaffold for ui-accessibility-or-bugfix in mr-robot77.github.io.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /ui-accessibility-or-bugfix

Use this workflow when working on **ui-accessibility-or-bugfix** in `mr-robot77.github.io`.

## Goal

Fixes or improves accessibility or minor bugs in existing UI features, usually by editing the HTML layout and associated JavaScript logic.

## Common Files

- `_layouts/portfolio.html`
- `assets/js/portfolio.js`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Update the relevant HTML layout file to improve markup or accessibility attributes.
- Modify JavaScript logic to enhance accessibility or fix bugs.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.