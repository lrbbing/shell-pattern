function setup() {
  let canvas = createCanvas(700, 700);
  canvas.parent("canvas-container");
  noiseSeed(seed);
  noLoop();
  createControls();
}
function draw() {
  background(245);
  noFill();

  let centerX = width / 2;
  let centerY = height * 0.7;

  circle(centerX, centerY, 10);
  stroke(100);
  if (showRibs) {
    drawRadialRibs(centerX, centerY);
  }

  if (showGrowthLines) {
    drawGrowthLines(centerX, centerY);
  }
  drawInfo();
}

function keyPressed() {
  if (key === "r" || key === "R") {
    seed = floor(random(10000));

    noiseSeed(seed);

    redraw();

    console.log("seed:", seed);
  }

  if (key === "b" || key === "B") {
    showRibs = !showRibs;
    redraw();
  }

  if (key === "g" || key === "G") {
    showGrowthLines = !showGrowthLines;
    redraw();
  }
  if (key === "s" || key === "S") {
    saveCanvas("shell-" + seed, "png");
  }
}
function drawInfo() {
  push();

  noStroke();
  fill(40);
  textSize(14);

  text("seed: " + seed, 20, 30);

  text("R regenerate   B ribs   G growth   S save", 20, 55);

  pop();
}
