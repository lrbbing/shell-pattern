function setup() {
  createCanvas(700, 700);

  noiseSeed(seed);

  noLoop();
}

function draw() {
  background(245);
  noFill();

  let centerX = width / 2;
  let centerY = height * 0.7;

  circle(centerX, centerY, 10);

  drawRadialRibs(centerX, centerY);
  drawGrowthLines(centerX, centerY);
}

function keyPressed() {
  if (key === "r" || key === "R") {
    seed = floor(random(10000));

    noiseSeed(seed);

    redraw();

    console.log("seed:", seed);
  }
}
