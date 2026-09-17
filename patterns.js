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
function drawGrowthLines(centerX, centerY) {
  strokeWeight(0.6);

  for (let t = growthStart; t < 1; t *= growthRate) {
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
