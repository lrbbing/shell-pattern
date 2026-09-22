let edgeFrequencySlider;
let noiseAmplitudeSlider;
let growthRateSlider;
let fieldThresholdSlider;
let fieldFrequencySlider;
let controls;
let patternButtons = [];

function createControls() {
  controls = createDiv();
  controls.parent("controls-container");

  createPatternControls();

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

  // Each control contains both a p5 slider and its displayed value.
  edgeFrequencySlider.slider.input(updateControls);
  noiseAmplitudeSlider.slider.input(updateControls);
  growthRateSlider.slider.input(updateControls);
  fieldThresholdSlider.slider.input(updateControls);
  fieldFrequencySlider.slider.input(updateControls);
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

function updatePatternButtons() {
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

  edgeFrequencySlider.valueLabel.html(edgeFrequency);
  noiseAmplitudeSlider.valueLabel.html(noiseAmplitude);
  growthRateSlider.valueLabel.html(growthRate);
  fieldThresholdSlider.valueLabel.html(fieldThreshold);
  fieldFrequencySlider.valueLabel.html(fieldFrequency);

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
