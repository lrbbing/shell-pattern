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

## Currently learning — Stage 7C

- Scalar field: `patternField(angle, t)` returns one number using `sin(angle * fieldFrequency + t * fieldPhase)`, in the range -1 to 1.
- Threshold: values greater than `fieldThreshold` become category A (gray 140); values less than or equal to it become category B (gray 235).
- Sampling: split angle and t into small cells with `fieldAngleStep` and `fieldTStep`, then evaluate the field at each cell's midpoint. Smaller steps give finer sampling and more drawing work.
- Drawing: classify the midpoint value, then use `surfacePoint()` to turn the cell corners into canvas x/y coordinates. Shared radial ribs are drawn over the filled cells.
- Determinism: the field uses no randomness. R changes the seeded shell geometry; the field categories in angle/t space stay the same when field settings stay the same.
- This two-category surface is preparation for later textile / knitting mapping.

## Workflow preference

- ChatGPT is used to explain architecture, concepts, and learning goals.
- Codex in VS Code handles multi-file implementation, repetitive edits, running, and debugging.
- For new concepts, keep examples small enough to understand.
- Avoid making the user manually copy large blocks of implementation code between files.
