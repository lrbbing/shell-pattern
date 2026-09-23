# Learning log

This records the user's reported learning progress and preferred workflow.

## Understood

- VS Code workspace / Explorer
- Live Server
- Terminal vs shell
- Basic Git: `status`, `add`, `commit`, `push`, `pull`
- Git branches
- Basic rebase/conflict experience
- JavaScript functions
- p5.js `setup` / `draw`
- `sin` / `cos` radial geometry
- `beginShape` / `vertex`
- `noise` vs `random`
- `noLoop` / `redraw`
- Event functions
- Basic DOM creation with p5.js
- Canvas vs DOM
- Multi-file JavaScript project structure

## Still becoming familiar

- GitHub Pull Requests / merge workflow
- JavaScript objects
- Callbacks
- DOM hierarchy
- CSS Flexbox
- Larger-project navigation
- Reading large diffs
- Shell surface parameter space: `angle` across the shell fan and normalized growth position `t` from origin to edge

## Currently learning — Stages 7C–7J

- Scalar field: Stage 7C introduced `sin(angle * fieldFrequency + t * fieldPhase)`, in the range -1 to 1. Stage 7D adds an organic contribution to this wave.
- Threshold: values greater than `fieldThreshold` become category A (gray 140); values less than or equal to it become category B (gray 235).
- Discretization: divide the continuous angle/t domain into `fieldRows` × `fieldColumns` cells (40 × 60 by default). Sample each cell midpoint. More rows/columns give finer sampling and more drawing work.
- 2D arrays: `grid[row][column]` accesses a cell, with zero-based indices. Each row is its own JavaScript array.
- Binary matrix: `generateFieldGrid()` stores 1 when `patternField(angle, t) > fieldThreshold`, otherwise 0 (including equality). It stores no x/y coordinates.
- Index mapping: midpoint `t = (row + 0.5) / fieldRows`; midpoint `angle = startAngle + (endAngle - startAngle) * (column + 0.5) / fieldColumns`, from `-0.8 * PI` to `-0.2 * PI`.
- Separating data from rendering: `drawFieldGrid(grid, centerX, centerY)` reads the stored bits and grid dimensions. It maps cell edges into angle/t and uses `surfacePoint()` to obtain x/y corners. 1 is gray 140; 0 is gray 235. Shared radial ribs draw above the cells.
- Each redraw refreshes `currentFieldGrid` and records `currentFieldGridSeed`, even outside Field mode. The same seed, parameters, and resolution reproduce the same matrix. All three Field renderers and CSV export read this shared data.
- 2D noise field: `noise(angle * fieldNoiseScale + 700, t * fieldNoiseScale)` varies continuously along both shell coordinates. Map its 0–1 range to -1–1 using `map()`. The fixed 700 offset selects a different region of noise space.
- Field composition: `waveField(angle, t)` and `noiseField(angle, t)` each generate one numeric value. `patternField(angle, t)` combines them.
- Weighted field combination: `combinedValue = waveValue * waveWeight + noiseValue * noiseWeight`. Weights 1/0 give pure sine, 0/1 give pure noise, and two nonzero weights blend them. Increasing a weight increases that field's contribution; relative weights favor rhythmic or irregular structure, though their actual sampled values also matter.
- Stage 7E replaces Stage 7D's noise amount with Noise weight and adds Wave weight. Defaults 1/0.8 preserve the Stage 7D result.
- Separating field generation from field rendering: the three field functions only compute numbers. `generateFieldGrid()` samples and thresholds; `drawFieldGrid()` chooses grayscale and converts corners with `surfacePoint()`.
- Weights are not normalized. Scaling both can change classification at nonzero thresholds. Both weights at zero return zero everywhere, which belongs to category B at threshold zero.
- Noise scale: larger values traverse more noise space across the shell, giving finer variation; smaller values give broader variation. Grid resolution controls sampling independently.
- Combined values can exceed -1–1. The threshold slider still spans -1–1, so its endpoints need not produce a single category when weighted field values exceed those endpoints.
- Determinism: the existing `noiseSeed(seed)` controls both geometry and the organic field. The same seed and settings reproduce the result. R selects a new seed; at Noise weight 0, only geometry changes, while at nonzero Noise weight the combined field changes too. No `random()` is used per sample.
- One data source, multiple renderings: `drawPattern()` calls `generateFieldGrid()` once per redraw, stores the result, then in Field mode passes that grid to `drawFieldGrid()` (Shell View), `drawGridPreview()` (Grid View), or `drawTextileView()` (Textile View). Switching views with unchanged settings recreates identical bits.
- Data representation vs geometry: the binary matrix contains only states. Shell View maps indices through angle/t and `surfacePoint()`; Grid View uses `x = left + column * cellSize` and `y = top + row * cellSize`, with no shell geometry or field evaluation.
- Grid View orientation: row 0 is at the top (the origin-side row in Shell View); column 0 is at the left. Cell outlines help reveal the resolution. The three view buttons select Field mode, and S saves whichever view is displayed.
- Serialization: `exportGridCSV(grid)` in `exports.js` turns each array row into text with `row.join(",")`. p5's `saveStrings()` writes those strings as separate lines. Export never calls the field generator.
- CSV (comma-separated values): no header or metadata rows; the first line is grid row 0, and the first value is column 0. A 40 × 60 grid becomes 40 lines with 60 binary values each.
- Exporting data vs exporting an image: Export CSV preserves abstract 0/1 cell states; S saves the rendered canvas as PNG. The CSV filename uses the seed recorded with the stored grid: `shell-pattern-seed-<seed>.csv`.
- Semantic mapping: `textileMapping` in `config.js` assigns role, yarn, and structure names to each state. These names describe an interpretation, not machine instructions.
- Lookup / mapping objects: `let meaning = textileMapping[grid[row][column]]` retrieves the object for a bit. `meaning.structure` supplies the displayed A/B label; role and yarn appear in the legend.
- Separating pattern data from textile meaning: `generateFieldGrid()` still produces only 0/1. `drawTextileView()` reads the grid and mapping without modifying either. Changing a mapping label changes interpretation, not the pattern or CSV.
- Textile View shows structure letters on a rectangular chart; Grid View shows binary grayscale states. Textile View now places row 0 at the bottom; Grid View keeps row 0 at the top. Reduce resolution to inspect letters more easily. No stitch simulation or machine-specific instructions are added.

## Stage 7J — Coordinate mapping

- Course / wale / needle mapping: in this project, `grid[row][column]` is interpreted as `grid[course][needle]`. Each column is a needle/wale position; each row is a course.
- Data orientation: column 0 is leftmost and row 0 is the bottom course. Columns increase left to right, courses bottom to top. This project convention is not universal for knitting machines.
- Storage order vs display order: Textile View computes `y = top + (rows - 1 - row) * cellSize`. It does not reverse arrays or change any bits. Chart labels use `row + 1` and `column + 1`, so course 1 is at the bottom and needle 1 at the left.
- CSV still writes array row 0 first, then row 1, etc. Its first line represents the bottom course in Textile View and the top row in Grid View. Shell View is unchanged.
- Endpoint numbers, direction labels, and an orientation legend make the convention visible. Semantic A/B lookup and binary export remain separate from display geometry.
- Stage 7 is complete; machine formats, beds, carriage direction, backing, floats, and machine commands remain outside this implementation.

## Workflow preference

- ChatGPT is used to explain architecture, concepts, and learning goals.
- Codex in VS Code handles multi-file implementation, repetitive edits, running, and debugging.
- For new concepts, keep examples small enough to understand.
- Avoid making the user manually copy large blocks of implementation code between files.
