# Shell Pattern Lab

A beginner-friendly p5.js creative coding and learning project exploring generative shell growth and natural shell patterns.

## Current features

- Radial shell geometry with scalloped edges and asymmetry.
- Radial ribs and growth lines, with noise-based variation in shape, rib spacing, and growth lines.
- A 700 × 700 canvas displaying the current seed and keyboard shortcuts.
- DOM sliders for edge frequency, noise amplitude, and growth rate, with visible values.
- Keyboard controls: **R** regenerates with a new seed, **B** toggles ribs and their outline, **G** toggles growth lines, and **S** saves a PNG.
- Static drawing using `noLoop()` and event-driven `redraw()`.

## Run with Live Server

1. Open this project folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` in Explorer and choose **Open with Live Server**.
4. Adjust the sliders or use the keyboard shortcuts in the browser.

No build step is required. An internet connection is needed to load p5.js 2.2.3 from the CDN.

## Project structure

- `index.html` — loads p5.js and project scripts; contains canvas and controls containers.
- `config.js` — generation parameters, seed, and visibility settings.
- `shell.js` — shell radius and shape calculations.
- `patterns.js` — radial ribs, their outline, and growth lines.
- `controls.js` — DOM sliders, value labels, and parameter updates.
- `sketch.js` — setup, drawing, keyboard interaction, and image saving.
- `css/style.css` — page layout and control panel styling.
- `AGENTS.md` — guidance for coding assistants.
- [Roadmap](docs/roadmap.md) — development stages and current focus.
- [Learning log](docs/learning-log.md) — concepts and workflow preferences.
