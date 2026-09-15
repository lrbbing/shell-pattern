function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(245);

  let cx = width / 2;
  let cy = height * 0.7;
  let radius = 250;

  circle(cx, cy, 10);

  for (let angle = -PI * 0.8; angle <= -PI * 0.2; angle += 0.1) {

    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;

    line(cx, cy, x, y);
  }
}