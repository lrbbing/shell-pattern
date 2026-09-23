function drawPattern(centerX, centerY) {
  // Keep export data current even when a different pattern mode is visible.
  currentFieldGrid = generateFieldGrid();
  currentFieldGridSeed = seed;
  // Filled field cells go underneath the shared ribs so they stay visible.
  if (patternMode === "Field") {
    if (fieldView === "Grid View") {
      drawGridPreview(currentFieldGrid);
      return; // The rectangular chart has no shell ribs or geometry.
    }
    if (fieldView === "Textile View") {
      drawTextileView(currentFieldGrid);
      return;
    }
    drawFieldGrid(currentFieldGrid, centerX, centerY);
  }

  // Draw the shared shell structure and the other surface patterns.
  if (showRibs) {
    drawRadialRibs(centerX, centerY);
  }

  if (patternMode === "Ribbed") {
    if (showGrowthLines) {
      drawGrowthLines(centerX, centerY);
    }
  } else if (patternMode === "Growth") {
    if (showGrowthLines) {
      // A rate closer to 1 packs the same growth contours more tightly.
      let contourRate = 1 + (growthRate - 1) / 2;
      drawGrowthLines(centerX, centerY, contourRate, 1.1);
    }
  } else if (patternMode === "Spotted") {
    drawSpots(centerX, centerY);
  } else if (patternMode === "Banding") {
    drawBanding(centerX, centerY);
  }
}

function drawRadialRibs(centerX, centerY) {
  strokeWeight(1.2);

  beginShape();
  vertex(centerX, centerY);

  for (let angle = -PI * 0.8; angle <= -PI * 0.2; ) {
    let radius = shellRadius(angle);

    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;

    line(centerX, centerY, x, y);

    vertex(x, y);

    let angleStep = map(
      noise(angle * ribNoiseScale + 300),
      0,
      1,
      ribStepMin,
      ribStepMax,
    );

    angle += angleStep;
  }

  vertex(centerX, centerY);
  endShape();
}
function drawGrowthLines(centerX, centerY, spacing = growthRate, weight = 0.6) {
  strokeWeight(weight);

  for (let t = growthStart; t < 1; t *= spacing) {
    beginShape();

    for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.05) {
      let radius = shellRadius(angle);

      let growthNoise = map(
        noise(t * growthNoiseScale + 200),
        0,
        1,
        -growthNoiseAmplitude,
        growthNoiseAmplitude,
      );

      let growthRadius = radius * (t + growthNoise);

      let x = centerX + cos(angle) * growthRadius;

      let y = centerY + sin(angle) * growthRadius;

      vertex(x, y);
    }

    endShape();
  }
}

function drawSpots(centerX, centerY) {
  // Keep the dot fill from affecting the next drawing operation.
  push();
  noStroke();
  fill(100);

  for (let t = growthStart; t < 0.95; t *= growthRate) {
    // Wider angle steps near the center keep dots from crowding together.
    let angleStep = 0.055 / t;
    for (
      let angle = -PI * 0.8 + 0.06;
      angle < -PI * 0.2 - 0.06;
      angle += angleStep
    ) {
      // noiseSeed(seed) makes these offsets repeat for the same seed.
      let spotAngle = angle + map(
        noise(angle * 8 + 400, t * 12), 0, 1, -0.025, 0.025,
      );
      let spotGrowth = t + map(
        noise(angle * 8 + 500, t * 12), 0, 1, -0.015, 0.015,
      );
      let radius = shellRadius(spotAngle) * spotGrowth;
      let diameter = map(noise(angle * 10 + 600, t * 15), 0, 1, 3, 8);

      let x = centerX + cos(spotAngle) * radius;
      let y = centerY + sin(spotAngle) * radius;
      circle(x, y, diameter);
    }
  }

  pop();
}

function drawBanding(centerX, centerY) {
  push();
  noFill();
  stroke(100);
  strokeWeight(2);

  for (let t = bandStart; t <= bandEnd; t += bandSpacing) {
    beginShape();

    for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.025) {
      // angle changes the wave across the fan. t shifts each band.
      let wave = sin(angle * bandWaveFrequency + t * 12);
      let waveT = t + wave * bandWaveAmplitude;
      let point = surfacePoint(angle, waveT, centerX, centerY);

      vertex(point.x, point.y);
    }

    endShape();
  }

  pop();
}

// Generate the regular wave field in shell parameter space.
function waveField(angle, t) {
  return sin(angle * fieldFrequency + t * fieldPhase);
}

// Generate continuous 2D noise using the current noise seed.
function noiseField(angle, t) {
  // The fixed offset selects a different region of noise space.
  return map(
    noise(angle * fieldNoiseScale + 700, t * fieldNoiseScale),
    0, 1, -1, 1,
  );
}

// Compose numeric fields here; grid generation handles classification.
function patternField(angle, t) {
  let waveValue = waveField(angle, t);
  let noiseValue = noiseField(angle, t);
  let combinedValue = waveValue * waveWeight + noiseValue * noiseWeight;

  return combinedValue;
}

// Store abstract pattern data only: grid[row][column] is 0 or 1.
function generateFieldGrid() {
  let grid = [];
  let startAngle = -PI * 0.8;
  let endAngle = -PI * 0.2;

  for (let row = 0; row < fieldRows; row++) {
    let gridRow = [];
    // Sample the middle of this row's growth interval.
    let t = (row + 0.5) / fieldRows;

    for (let column = 0; column < fieldColumns; column++) {
      // Sample the middle of this column's angle interval.
      let angle = startAngle + (endAngle - startAngle) * (column + 0.5) / fieldColumns;
      let value = patternField(angle, t);
      let binaryValue = value > fieldThreshold ? 1 : 0;
      gridRow.push(binaryValue);
    }

    grid.push(gridRow);
  }

  return grid;
}

function drawFieldGrid(grid, centerX, centerY) {
  push();
  noStroke();

  // Use the supplied grid's dimensions, not the current control settings.
  let rows = grid.length;
  let columns = grid[0].length;
  let startAngle = -PI * 0.8;
  let endAngle = -PI * 0.2;

  for (let row = 0; row < rows; row++) {
    let t = row / rows;
    let nextT = (row + 1) / rows;

    for (let column = 0; column < columns; column++) {
      let angle = startAngle + (endAngle - startAngle) * column / columns;
      let nextAngle = startAngle + (endAngle - startAngle) * (column + 1) / columns;

      if (grid[row][column] === 1) {
        fill(140); // Category A: darker gray.
      } else {
        fill(235); // Category B: lighter gray.
      }

      // Only rendering converts cell corners to canvas x/y positions.
      let a = surfacePoint(angle, t, centerX, centerY);
      let b = surfacePoint(nextAngle, t, centerX, centerY);
      let c = surfacePoint(nextAngle, nextT, centerX, centerY);
      let d = surfacePoint(angle, nextT, centerX, centerY);
      quad(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
    }
  }

  pop();
}

// One binary data source, a second rendering: no field or shell calculations.
function drawGridPreview(grid) {
  let rows = grid.length;
  let columns = grid[0].length;
  // Fit square cells below the seed/shortcut text, leaving room for a caption.
  let cellSize = min((width - 80) / columns, (height - 180) / rows);
  let left = (width - columns * cellSize) / 2;
  let top = 100;

  push();
  stroke(190);
  strokeWeight(0.5);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (grid[row][column] === 1) {
        fill(140);
      } else {
        fill(235);
      }
      let x = left + column * cellSize;
      let y = top + row * cellSize;
      rect(x, y, cellSize, cellSize);
    }
  }

  noStroke();
  fill(40);
  textSize(12);
  text("Grid View: 1 = dark, 0 = light | row 0 at top, column 0 at left",
    40, top + rows * cellSize + 25);
  pop();
}

// Interpret each bit through a lookup object; never change the supplied grid.
function drawTextileView(grid) {
  let rows = grid.length;
  let columns = grid[0].length;
  let cellSize = min((width - 140) / columns, (height - 300) / rows);
  let left = (width - columns * cellSize) / 2;
  let top = 120;

  push();
  textAlign(CENTER, CENTER);
  textSize(min(16, cellSize * 0.7));

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let value = grid[row][column];
      let meaning = textileMapping[value];
      let x = left + column * cellSize;
      // grid[row][column] means grid[course][needle] in this project.
      // Flip only the screen position: array row 0 is the bottom course.
      let y = top + (rows - 1 - row) * cellSize;

      stroke(190);
      strokeWeight(0.5);
      fill(245);
      rect(x, y, cellSize, cellSize);
      noStroke();
      fill(40);
      text(meaning.structure, x + cellSize / 2, y + cellSize / 2);
    }
  }

  let bottom = top + rows * cellSize;
  noStroke();
  fill(40);
  textSize(12);

  // Chart numbers are one-based; array indices remain zero-based.
  textAlign(CENTER, CENTER);
  text("1", left + cellSize / 2, bottom + 12);
  text(columns, left + (columns - 0.5) * cellSize, bottom + 12);
  text("1", left - 18, bottom - cellSize / 2);
  text(rows, left - 18, top + cellSize / 2);
  text("Needles / Wales →", width / 2, bottom + 32);
  textAlign(LEFT, TOP);
  text("Courses ↑", left - 30, top - 25);

  let legendY = bottom + 52;
  text("Origin: bottom-left | Columns: left → right | Rows: bottom → top", 40, legendY);
  text("Project convention only. Chart numbers = array indices + 1.", 40, legendY + 18);
  text("CSV writes array row 0 first (bottom course 1 here).", 40, legendY + 36);

  // Build the textile meaning legend from the same mapping as the cells.
  for (let value of [0, 1]) {
    let meaning = textileMapping[value];
    text(value + " → " + meaning.role + " / " + meaning.yarn +
      " yarn / Structure " + meaning.structure, 40, legendY + 56 + 18 * value);
  }
  pop();
}
