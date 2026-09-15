function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(245);
  //shell center
  noFill();
  let centerX = width / 2;
  let centerY = height * 0.7;

  circle(centerX, centerY, 10);

  beginShape();

  vertex(centerX, centerY);

  for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.05) {
    let centerBoost = cos(angle + HALF_PI) * 80;
    let radius = 220 + centerBoost;

    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;

    line(centerX, centerY, x, y);

    vertex(x, y);
  }

  vertex(centerX, centerY);

  endShape();
}
