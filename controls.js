let edgeFrequencySlider;
let noiseAmplitudeSlider;
let growthRateSlider;
let fieldThresholdSlider;
let fieldFrequencySlider;
let waveWeightSlider;
let noiseWeightSlider;
let fieldNoiseScaleSlider;
let fieldColumnsSlider;
let fieldRowsSlider;
let controls;
let patternButtons = [];
let fieldViewButtons = [];

function createControls() {
  controls = createDiv();
  controls.parent("controls-container");

  createPatternControls();
  createFieldViewControls();

  let exportGroup = createDiv();
  exportGroup.class("control-group pattern-buttons");
  exportGroup.parent(controls);
  let exportButton = createButton("Export CSV");
  exportButton.parent(exportGroup);
  exportButton.attribute("type", "button");
  exportButton.mousePressed(function () {
    exportGridCSV(currentFieldGrid);
  });

  edgeFrequencySlider = createSliderControl(
    "Edge frequency",
    4,
    18,
    edgeFrequency,
    0.1,
  );

  noiseAmplitudeSlider = createSliderControl(
    "Noise amplitude",
    0,
    30,
    noiseAmplitude,
    0.5,
  );

  growthRateSlider = createSliderControl(
    "Growth rate",
    1.05,
    1.3,
    growthRate,
    0.01,
  );

  let fieldHeading = createElement("h2", "Field");
  fieldHeading.class("pattern-heading");
  fieldHeading.parent(controls);

  fieldThresholdSlider = createSliderControl(
    "Field threshold", -1, 1, fieldThreshold, 0.05,
  );
  fieldFrequencySlider = createSliderControl(
    "Field frequency", 0, 16, fieldFrequency, 0.5,
  );

  waveWeightSlider = createSliderControl(
    "Wave weight", 0, 2, waveWeight, 0.05,
  );
  noiseWeightSlider = createSliderControl(
    "Noise weight", 0, 2, noiseWeight, 0.05,
  );
  fieldNoiseScaleSlider = createSliderControl(
    "Field noise scale", 0.5, 10, fieldNoiseScale, 0.1,
  );

  fieldColumnsSlider = createSliderControl(
    "Grid columns", 10, 100, fieldColumns, 1,
  );
  fieldRowsSlider = createSliderControl(
    "Grid rows", 10, 80, fieldRows, 1,
  );

  // Each control contains both a p5 slider and its displayed value.
  edgeFrequencySlider.slider.input(updateControls);
  noiseAmplitudeSlider.slider.input(updateControls);
  growthRateSlider.slider.input(updateControls);
  fieldThresholdSlider.slider.input(updateControls);
  fieldFrequencySlider.slider.input(updateControls);
  waveWeightSlider.slider.input(updateControls);
  noiseWeightSlider.slider.input(updateControls);
  fieldNoiseScaleSlider.slider.input(updateControls);
  fieldColumnsSlider.slider.input(updateControls);
  fieldRowsSlider.slider.input(updateControls);
}

function createPatternControls() {
  let group = createDiv();
  group.class("control-group");
  group.parent(controls);
  group.attribute("role", "group");
  group.attribute("aria-label", "Pattern");

  let heading = createElement("h2", "Pattern");
  heading.class("pattern-heading");
  heading.parent(group);

  let buttons = createDiv();
  buttons.class("pattern-buttons");
  buttons.parent(group);

  for (let mode of ["Ribbed", "Growth", "Spotted", "Banding", "Field"]) {
    let button = createButton(mode);
    button.parent(buttons);
    button.attribute("type", "button");
    patternButtons.push(button);

    // This callback runs when the button is clicked, not when it is created.
    button.mousePressed(function () {
      patternMode = mode;
      updatePatternButtons();
      redraw();
    });
  }

  updatePatternButtons();
}

function createFieldViewControls() {
  let group = createDiv();
  group.class("control-group");
  group.parent(controls);
  group.attribute("role", "group");
  group.attribute("aria-label", "Field view");

  let heading = createElement("h2", "Field view");
  heading.class("pattern-heading");
  heading.parent(group);

  let buttons = createDiv();
  buttons.class("pattern-buttons");
  buttons.parent(group);

  for (let view of ["Shell View", "Grid View", "Textile View"]) {
    let button = createButton(view);
    button.parent(buttons);
    button.attribute("type", "button");
    fieldViewButtons.push(button);
    button.mousePressed(function () {
      fieldView = view;
      patternMode = "Field";
      updatePatternButtons();
      redraw();
    });
  }

  updatePatternButtons();
}

function updatePatternButtons() {
  for (let button of fieldViewButtons) {
    let isActive = patternMode === "Field" && button.html() === fieldView;
    button.attribute("aria-pressed", String(isActive));
  }
  for (let button of patternButtons) {
    let isActive = button.html() === patternMode;
    button.attribute("aria-pressed", String(isActive));
  }
}

function updateControls() {
  edgeFrequency = edgeFrequencySlider.slider.value();
  noiseAmplitude = noiseAmplitudeSlider.slider.value();
  growthRate = growthRateSlider.slider.value();
  fieldThreshold = fieldThresholdSlider.slider.value();
  fieldFrequency = fieldFrequencySlider.slider.value();
  waveWeight = waveWeightSlider.slider.value();
  noiseWeight = noiseWeightSlider.slider.value();
  fieldNoiseScale = fieldNoiseScaleSlider.slider.value();
  fieldColumns = fieldColumnsSlider.slider.value();
  fieldRows = fieldRowsSlider.slider.value();

  edgeFrequencySlider.valueLabel.html(edgeFrequency);
  noiseAmplitudeSlider.valueLabel.html(noiseAmplitude);
  growthRateSlider.valueLabel.html(growthRate);
  fieldThresholdSlider.valueLabel.html(fieldThreshold);
  fieldFrequencySlider.valueLabel.html(fieldFrequency);
  waveWeightSlider.valueLabel.html(waveWeight);
  noiseWeightSlider.valueLabel.html(noiseWeight);
  fieldNoiseScaleSlider.valueLabel.html(fieldNoiseScale);
  fieldColumnsSlider.valueLabel.html(fieldColumns);
  fieldRowsSlider.valueLabel.html(fieldRows);

  redraw();
}

function createSliderControl(label, min, max, value, step) {
  let group = createDiv();
  group.class("control-group");
  group.parent(controls);

  let header = createDiv();
  header.class("control-header");
  header.parent(group);

  let labelElement = createSpan(label);
  labelElement.parent(header);

  let valueElement = createSpan(value);
  valueElement.parent(header);

  let slider = createSlider(min, max, value, step);

  slider.parent(group);
  slider.attribute("aria-label", label);

  return {
    slider: slider,
    valueLabel: valueElement,
  };
}
