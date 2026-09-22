function drawPattern(centerX, centerY) {
  // Filled field cells go underneath the shared ribs so they stay visible.
  if (patternMode === "Field") {
    drawField(centerX, centerY);
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

// A scalar field returns one number for each shell-space position.
function patternField(angle, t) {
  return sin(angle * fieldFrequency + t * fieldPhase);
}

function drawField(centerX, centerY) {
  push();
  noStroke();

  let endAngle = -PI * 0.2;
  for (let angle = -PI * 0.8; angle < endAngle; angle += fieldAngleStep) {
    let nextAngle = min(angle + fieldAngleStep, endAngle);
    for (let t = 0; t < 1; t += fieldTStep) {
      let nextT = min(t + fieldTStep, 1);

      // Sample the middle of each cell, then classify its numeric value.
      let sampleAngle = (angle + nextAngle) / 2;
      let sampleT = (t + nextT) / 2;
      let value = patternField(sampleAngle, sampleT);
      if (value > fieldThreshold) {
        fill(140); // Category A: darker gray.
      } else {
        fill(235); // Category B: lighter gray (includes equality).
      }

      // Map the cell's four shell-space corners to canvas x/y positions.
      let a = surfacePoint(angle, t, centerX, centerY);
      let b = surfacePoint(nextAngle, t, centerX, centerY);
      let c = surfacePoint(nextAngle, nextT, centerX, centerY);
      let d = surfacePoint(angle, nextT, centerX, centerY);
      quad(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);
    }
  }

  pop();
}
