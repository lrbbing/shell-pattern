function setup() {
  let canvas = createCanvas(700, 700);
  canvas.parent("canvas-container");

  noiseSeed(seed);

  // 静态生成模式：
  // 只有参数变化、按键等事件发生时才 redraw()
  noLoop();

  // 创建右侧控制面板
  createControls();
}

function draw() {
  background(245);

  // 每次 redraw 都重新明确绘图状态
  noFill();
  stroke(100);

  let centerX = width / 2;
  let centerY = height * 0.7;

  // Show the shell origin only when drawing shell geometry.
  if (patternMode !== "Field" || fieldView === "Shell View") {
    circle(centerX, centerY, 10);
  }

  drawPattern(centerX, centerY);

  drawInfo();
}

function keyPressed() {
  // R = regenerate
  if (key === "r" || key === "R") {
    seed = floor(random(10000));

    noiseSeed(seed);

    redraw();

    console.log("seed:", seed);
  }

  // B = ribs on / off
  if (key === "b" || key === "B") {
    showRibs = !showRibs;

    redraw();
  }

  // G = growth lines on / off
  if (key === "g" || key === "G") {
    showGrowthLines = !showGrowthLines;

    redraw();
  }

  // S = save image
  if (key === "s" || key === "S") {
    saveCanvas("shell-" + seed, "png");
  }
}

function drawInfo() {
  // 保存当前贝壳绘图状态
  push();

  noStroke();
  fill(40);

  textSize(14);

  text("seed: " + seed, 20, 30);

  text("R regenerate   B ribs   G growth   S save", 20, 55);

  // 恢复之前的 stroke / fill 等状态
  pop();
}
