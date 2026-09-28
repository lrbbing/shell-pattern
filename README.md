# Shell Pattern Lab

## About

Shell Pattern Lab is a beginner creative-coding project built with p5.js. It began as a study of generative shell geometry and grew into an exploration of parameter space, scalar fields, sine and noise field composition, thresholding, binary pattern grids, textile mapping, and CSV data export. The focus has shifted from visual shell studies toward computational textile pattern data.

## Current pipeline

```text
generative shell
-> parameter-space field
-> weighted field composition
-> threshold
-> binary grid
-> shell / grid / textile views
-> CSV export
```

## Features

- Five shell pattern modes: Ribbed, Growth, Spotted, Banding, and Field. Shell geometry has scalloped edges, asymmetry, and seeded noise variation.
- Sliders adjust shell shape and growth, plus Field frequency, threshold, wave and noise weights, noise scale, and grid size. The same seed and settings reproduce the pattern.
- Field mode samples a weighted sine and noise field into a 0/1 grid. Shell View maps the grid onto the shell; Grid View shows its cells; Textile View labels the two states with editable textile meanings and course/needle orientation.
- Export the current binary grid as CSV, or save the displayed canvas as a PNG. Keyboard shortcuts: **R** new seed, **B** toggle ribs, **G** toggle growth lines, **S** save PNG.

The textile labels are a pattern interpretation, not machine instructions. In Textile View, grid row 0 is the bottom course; in Grid View it appears at the top. CSV writes row 0 first.

## Project structure

- `index.html` — page entry point and p5.js script loading.
- `config.js` — generation settings, seed, view state, and textile labels.
- `shell.js` — shell geometry and surface coordinates.
- `patterns.js` — pattern generation, binary grid, and view rendering.
- `exports.js` — CSV serialization and download.
- `controls.js` — buttons, sliders, and their value labels.
- `sketch.js` — p5.js setup, drawing, keyboard controls, and PNG saving.
- `css/` — page and control panel styles.
- `docs/` — [roadmap](docs/roadmap.md) and [learning log](docs/learning-log.md).

## Running locally

1. Open this repository folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and select **Open with Live Server**.

No build step is needed. An internet connection loads p5.js from the CDN.

## Learning goals

The [learning log](docs/learning-log.md) documents progress with p5.js and JavaScript, DOM interaction, Git and GitHub, generative systems, data representation, and computational textile thinking.

## Credits / References

- **Inspiration / reference:** Sarah Spencer's 2017 shell-pattern work in Processing was studied during the broader research for this project. Her source states that its code is licensed under [CC BY 3.0 Unported](https://creativecommons.org/licenses/by/3.0/). No code from that work has been identified as copied or adapted in this repository; Shell Pattern Lab does not include her implementation.
- **Third-party library:** [p5.js](https://github.com/processing/p5.js) is loaded from a CDN at runtime and is licensed separately under LGPL-2.1. Its source is not included here.
- **Code directly copied or adapted from external implementations:** None identified in this repository.

The [MIT license](LICENSE) covers this project's original software code and associated documentation, not third-party material. Creative Commons licenses are generally intended for creative works rather than software; [Creative Commons recommends software-specific licenses for code](https://creativecommons.org/faq/#can-i-apply-a-creative-commons-license-to-software).

## Status

The initial learning prototype and v1.0 release review are complete. See the [release notes](docs/release-notes-v1.0.md) and [roadmap](docs/roadmap.md).
