# Roadmap

Stage 7 is complete through Stage 7J — Knit Coordinate and Orientation Mapping. Stages 0–7 are completed foundations reflected in the current project.

| Stage | Status | Current implementation |
| --- | --- | --- |
| Stage 0 — VS Code + p5.js environment | Completed | HTML entry point loads p5.js; run locally with Live Server. |
| Stage 1 — Radial shell | Completed | Sine and cosine place radial ribs around a shared center. |
| Stage 2 — Scallop geometry | Completed | Shell radius combines a center bulge, scalloped edge, and asymmetry. |
| Stage 3 — Growth lines | Completed | Nested growth curves use multiplicative growth spacing. |
| Stage 4 — Natural irregularity with noise | Completed | Seeded noise varies the shell shape, rib spacing, and growth lines. |
| Stage 5 — Multi-file project structure | Completed | Parameters, geometry, patterns, controls, drawing, and styling live in separate files. |
| Stage 6 — Interaction and DOM parameter controls | Completed | Three sliders with value labels; keyboard regeneration, visibility toggles, and PNG saving; event-driven redraw. |
| Stage 7 — Pattern modes / richer shell surface systems | **Completed through Stage 7J** | Stage 7A added Ribbed, Growth, and Spotted modes. Stage 7B adds Banding and maps shell-surface `(angle, t)` coordinates to canvas `(x, y)` positions. Stage 7C adds a deterministic scalar field, threshold classification into two grayscale categories, and angle/t sampling. Stage 7D extends Field with seeded continuous 2D noise, adjustable noise amount and scale, and exact recovery of the regular field at amount zero. Stage 7E separates wave and noise generation from rendering and combines them with independent Wave weight and Noise weight controls. Stage 7F samples the composed field into a 2D binary array and renders that data onto the shell, with integer row/column controls. Stage 7G adds Shell View and Grid View, demonstrating two renderings of the same binary data. Grid View uses row/column placement without shell geometry. Stage 7H retains a shared current grid for both views and CSV serialization, with a seed-based filename. Export does not regenerate data. Stage 7I adds a separate textile mapping object and Textile View with structure labels and a mapping legend, preserving the binary source and CSV. Stage 7J defines the project chart convention: columns are needle/wale positions increasing rightward, rows are courses increasing upward from a bottom-left origin. Only Textile View flips display order; binary storage and CSV row-0-first order stay unchanged. Machine-specific instructions, stitch simulation, and reaction-diffusion / Meinhardt systems remain future work. |
| Stage 8 — Open-source / GitHub exploration and project finishing | Future placeholder | To be explored. |
