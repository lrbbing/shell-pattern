function drawPattern(centerX, centerY) {
  if (patternMode === "Ribbed") {
    if (showRibs) {
      drawRadialRibs(centerX, centerY);
    }
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
