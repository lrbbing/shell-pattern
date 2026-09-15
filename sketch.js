let edgeFrequency = 10;
let edgeAmplitude = 8;

let asymmetryFrequency = 2;
let asymmetryAmplitude = 12;

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(245);
  noFill();

  // shell center
  let centerX = width / 2;
  let centerY = height * 0.7;

  circle(centerX, centerY, 10);

  // shell outline + radial ribs
  beginShape();
  vertex(centerX, centerY);

  for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.05) {
    let radius = shellRadius(angle);

    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;

    strokeWeight(1.2);
    line(centerX, centerY, x, y);

    vertex(x, y);
  }

  vertex(centerX, centerY);
  endShape();

  // growth lines
  for (let t = 0.2; t < 1; t += 0.1) {
    beginShape();

    for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.05) {
      let radius = shellRadius(angle);
      let growthRadius = radius * t;

      let x = centerX + cos(angle) * growthRadius;
      let y = centerY + sin(angle) * growthRadius;

      strokeWeight(0.6);
      vertex(x, y);
    }

    endShape();
  }
}

function shellRadius(angle) {
  let centerBoost = cos(angle + HALF_PI) * 80;

  let edgeWave = sin(angle * edgeFrequency) * edgeAmplitude;

  let asymmetry = sin(angle * asymmetryFrequency + 0.8) * asymmetryAmplitude;

  return 220 + centerBoost + edgeWave + asymmetry;
}
