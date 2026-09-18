# Shell Pattern Lab

## Purpose

This is both a beginner-friendly creative coding project and a learning project built with p5.js. It explores generative shell growth and natural shell surface patterns while the user learns JavaScript, p5.js, VS Code, Git, and GitHub.

The visual direction includes radial growth, scallop-like outlines, growth lines, noise-based irregularity, and natural pattern variation. The goal is generative systems inspired by shell growth, not photorealistic rendering.

## Coding guidance

- Keep code beginner-readable. Prefer simple JavaScript and p5.js.
- Do not introduce frameworks such as React.
- Do not over-engineer the project or add unnecessary abstractions.
- Do not rewrite the whole project unless explicitly requested.
- Preserve the existing structure and working behavior when refactoring.
- Prefer incremental changes; inspect the current code before substantial changes.
- Explain important concepts clearly, using small examples for new concepts.

## Workflow

- Run the project with VS Code Live Server from `index.html`.
- Debug implementation problems yourself before asking the user to manually debug. Perform available checks and explain any limitations.
- The user should understand important concepts, but does not need to manually perform repetitive debugging.
- Handle repetitive edits across files directly; avoid asking the user to copy large blocks of implementation code between files.
- When making substantial changes, summarize which files changed and why.

## Project structure

- `config.js` — generative parameters, seed, and visibility settings.
- `shell.js` — shell geometry.
- `patterns.js` — radial ribs, their outline, and growth lines.
- `controls.js` — DOM parameter sliders and value labels.
- `sketch.js` — setup, drawing, keyboard interaction, and image saving.
- `index.html` — loads p5.js and project scripts; defines page containers.
- `css/style.css` — page layout and control panel styling.
- `README.md` — project overview and running instructions.
- `docs/roadmap.md` — development stages.
- `docs/learning-log.md` — learning progress and workflow preferences.
