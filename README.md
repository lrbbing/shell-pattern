# Shell Pattern Lab

A beginner-friendly p5.js creative coding and learning project exploring generative shell growth and natural shell patterns.

## Current features

- Radial shell geometry with scalloped edges and asymmetry.
- Radial ribs and growth lines, with noise-based variation in shape, rib spacing, and growth lines.
- Pattern buttons: **Ribbed** keeps the original ribs and growth lines, **Growth** draws denser contours, **Spotted** draws seeded dots, **Banding** draws restrained waves across the shell surface, and **Field** classifies a weighted combination of a sine field and seeded 2D noise into a binary grid, rendered as two grayscale surface categories.
- A 700 × 700 canvas displaying the current seed and keyboard shortcuts.
- DOM sliders for edge frequency, noise amplitude, and growth rate, with visible values, plus Field threshold, frequency, noise scale, Wave weight, Noise weight, Grid columns, and Grid rows controls (always visible; used in Field mode).
- Keyboard controls: **R** regenerates with a new seed, **B** toggles the shared ribs in every mode, **G** toggles contours in Ribbed and Growth, and **S** saves a PNG. Visibility settings persist when switching modes; Spotted, Banding, and Field do not use the growth-line toggle.
- Static drawing using `noLoop()` and event-driven `redraw()`.

Set **Wave weight / Noise weight** to `1 / 0` for the regular sine field, `0 / 1` for pure noise, or use both for a blend. Defaults `1 / 0.8` preserve the Stage 7D blend. Larger **Field noise scale** values produce finer variation. R regenerates both shell geometry and seeded noise. Both weights at zero give a constant field of zero (light gray at threshold zero).

Field mode generates a fresh `grid[row][column]` on each redraw: 40 rows × 60 columns by default, containing only 0 or 1. Rows follow growth from origin to edge; columns run across the shell fan. Lower grid resolutions show coarser cells; higher resolutions sample finer detail. The grid stores no canvas coordinates and has no export feature.

**Shell View** and **Grid View** buttons select Field mode and choose how its grid is displayed. Shell View maps the bits onto the shell with ribs; Grid View draws a rectangular chart of square cells (1 dark, 0 light). Row 0 is at the top and column 0 at the left. Switching views regenerates identical data from unchanged seed/settings. S saves the current canvas view. Other pattern buttons keep their existing shell rendering.

## Run with Live Server

1. Open this project folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` in Explorer and choose **Open with Live Server**.
4. Adjust the sliders or use the keyboard shortcuts in the browser.

No build step is required. An internet connection is needed to load p5.js 2.2.3 from the CDN.

## Project structure

- `index.html` — loads p5.js and project scripts; contains canvas and controls containers.
- `config.js` — generation parameters, seed, pattern mode, and visibility settings.
- `shell.js` — shell radius, shape calculations, and surface-coordinate conversion.
- `patterns.js` — pattern selection, radial ribs, growth contours, seeded dots, surface banding, and scalar-field classification.
- `controls.js` — DOM sliders, value labels, and parameter updates.
- `sketch.js` — setup, drawing, keyboard interaction, and image saving.
- `css/style.css` — page layout and control panel styling.
- `AGENTS.md` — guidance for coding assistants.
- [Roadmap](docs/roadmap.md) — development stages and current focus.
- [Learning log](docs/learning-log.md) — concepts and workflow preferences.
