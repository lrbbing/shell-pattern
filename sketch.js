function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(245);
  //shell center
  let cx = width / 2;
  let cy = height * 0.7;

  circle(cx, cy, 10);

  // draw radial ribs
  for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.1) {
    let centerBoost = cos(angle + HALF_PI) * 80;
    let radius = 220 + centerBoost;

    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;

    line(cx, cy, x, y);
  }
}
