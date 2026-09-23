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

Each redraw refreshes the shared `currentFieldGrid[row][column]`: 40 rows × 60 columns by default, containing only 0 or 1. Rows follow growth from origin to edge; columns run across the shell fan. Lower grid resolutions show coarser cells; higher resolutions sample finer detail. The grid stores no canvas coordinates.

**Shell View**, **Grid View**, and **Textile View** buttons select Field mode and choose how its grid is displayed. Shell View maps the bits onto the shell with ribs; Grid View draws a rectangular chart of square cells (1 dark, 0 light). In Grid View, row 0 is at the top and column 0 at the left. Switching views regenerates identical data from unchanged seed/settings. S saves the current canvas view. Other pattern buttons keep their existing shell rendering.

**Export CSV** downloads the stored binary grid as `shell-pattern-seed-<seed>.csv`, with no header: one grid row per line and comma-separated 0/1 values. It does not regenerate the pattern. All three Field views read this same stored grid. In other pattern modes, export still contains the current Field data, kept up to date by redraws. CSV saves pattern data; S saves a PNG of the canvas.

**Textile View** looks up each binary cell in `textileMapping` in `config.js` and displays its structure label. The legend shows `0 → Ground / Light yarn / Structure A` and `1 → Pattern / Dark yarn / Structure B`. These are editable semantic labels, not machine instructions or simulated stitches. Grid View shows grayscale states; Textile View shows their assigned meaning. Lower row/column counts make the letters easier to read. The source grid and CSV remain 0/1.

**Textile coordinates (project convention):** `grid[row][column]` means `grid[course][needle]`. Column 0 is the leftmost needle/wale position; row 0 is the bottom course. Columns increase left to right and rows bottom to top. Textile View labels courses and needles starting at 1 (`index + 1`) and flips only the displayed y coordinate. This is not a universal machine convention. Grid View still shows row 0 at the top; CSV still writes array row 0 first, representing Textile View's bottom course. No data is reversed or mutated for orientation.

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
- `exports.js` — serializes the stored binary grid and downloads CSV.
- `controls.js` — DOM sliders, value labels, and parameter updates.
- `sketch.js` — setup, drawing, keyboard interaction, and image saving.
- `css/style.css` — page layout and control panel styling.
- `AGENTS.md` — guidance for coding assistants.
- [Roadmap](docs/roadmap.md) — development stages and current focus.
- [Learning log](docs/learning-log.md) — concepts and workflow preferences.
