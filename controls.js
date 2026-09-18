let edgeFrequencySlider;
let noiseAmplitudeSlider;
let growthRateSlider;
let controls;

function createControls() {
  controls = createDiv();
  controls.parent("controls-container");

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

  // Each control contains both a p5 slider and its displayed value.
  edgeFrequencySlider.slider.input(updateControls);
  noiseAmplitudeSlider.slider.input(updateControls);
  growthRateSlider.slider.input(updateControls);
}

function updateControls() {
  edgeFrequency = edgeFrequencySlider.slider.value();
  noiseAmplitude = noiseAmplitudeSlider.slider.value();
  growthRate = growthRateSlider.slider.value();

  edgeFrequencySlider.valueLabel.html(edgeFrequency);
  noiseAmplitudeSlider.valueLabel.html(noiseAmplitude);
  growthRateSlider.valueLabel.html(growthRate);

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
