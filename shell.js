function shellRadius(angle) {
  // large-scale center bulge
  let centerBoost = cos(angle + HALF_PI) * 80;

  // regular scalloped edge
  let edgeWave = sin(angle * edgeFrequency) * edgeAmplitude;

  // slow large-scale asymmetry
  let asymmetry = sin(angle * asymmetryFrequency + 0.8) * asymmetryAmplitude;

  // continuous natural irregularity
  let irregularity = map(
    noise(angle * noiseScale + 100),
    0,
    1,
    -noiseAmplitude,
    noiseAmplitude,
  );

  return 220 + centerBoost + edgeWave + asymmetry + irregularity;
}
