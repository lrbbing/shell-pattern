let edgeFrequency = 10;
let edgeAmplitude = 8;

let asymmetryFrequency = 2;
let asymmetryAmplitude = 12;

let noiseScale = 1.5;
let noiseAmplitude = 12;

let growthStart = 0.18;
let growthRate = 1.18;

let growthNoiseScale = 3;
let growthNoiseAmplitude = 0.03;

let ribNoiseScale = 2;
let ribStepMin = 0.035;
let ribStepMax = 0.065;

let bandStart = 0.28;
let bandEnd = 0.94;
let bandSpacing = 0.11;
let bandWaveFrequency = 5;
let bandWaveAmplitude = 0.025;

// Scalar field settings: angle is in radians, t runs from 0 to 1.
let fieldFrequency = 6;
let fieldPhase = 12;
let fieldThreshold = 0;
let waveWeight = 1;
let noiseWeight = 0.8;
let fieldNoiseScale = 3;
let fieldColumns = 60;
let fieldRows = 40;

let seed = 1;

// Meaning is separate from the neutral 0/1 pattern data.
const textileMapping = {
  0: { role: "Ground", yarn: "Light", structure: "A" },
  1: { role: "Pattern", yarn: "Dark", structure: "B" },
};

// Shared binary data for all views and CSV export, refreshed on redraw.
let currentFieldGrid = [];
let currentFieldGridSeed = seed;

let patternMode = "Ribbed";
let fieldView = "Shell View";

let showRibs = true;
let showGrowthLines = true;
