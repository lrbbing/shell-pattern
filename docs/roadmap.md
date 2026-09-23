# Roadmap

Stage 7G — Grid Preview is the current stage. Stages 0–6 and Stages 7A–7F are completed foundations reflected in the current project.

| Stage | Status | Current implementation |
| --- | --- | --- |
| Stage 0 — VS Code + p5.js environment | Completed | HTML entry point loads p5.js; run locally with Live Server. |
| Stage 1 — Radial shell | Completed | Sine and cosine place radial ribs around a shared center. |
| Stage 2 — Scallop geometry | Completed | Shell radius combines a center bulge, scalloped edge, and asymmetry. |
| Stage 3 — Growth lines | Completed | Nested growth curves use multiplicative growth spacing. |
| Stage 4 — Natural irregularity with noise | Completed | Seeded noise varies the shell shape, rib spacing, and growth lines. |
| Stage 5 — Multi-file project structure | Completed | Parameters, geometry, patterns, controls, drawing, and styling live in separate files. |
| Stage 6 — Interaction and DOM parameter controls | Completed | Three sliders with value labels; keyboard regeneration, visibility toggles, and PNG saving; event-driven redraw. |
| Stage 7 — Pattern modes / richer shell surface systems | **Current: Stage 7G — Grid Preview** | Stage 7A added Ribbed, Growth, and Spotted modes. Stage 7B adds Banding and maps shell-surface `(angle, t)` coordinates to canvas `(x, y)` positions. Stage 7C adds a deterministic scalar field, threshold classification into two grayscale categories, and angle/t sampling. Stage 7D extends Field with seeded continuous 2D noise, adjustable noise amount and scale, and exact recovery of the regular field at amount zero. Stage 7E separates wave and noise generation from rendering and combines them with independent Wave weight and Noise weight controls. Stage 7F samples the composed field into a 2D binary array and renders that data onto the shell, with integer row/column controls. Stage 7G adds Shell View and Grid View, demonstrating two renderings of the same binary data. Grid View uses row/column placement without shell geometry. File export is not implemented. Textile / knitting mapping and reaction-diffusion / Meinhardt systems remain future work. |
| Stage 8 — Open-source / GitHub exploration and project finishing | Future placeholder | To be explored. |
