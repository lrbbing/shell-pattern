// Serialize the stored binary grid. Do not generate or render a pattern here.
function exportGridCSV(grid) {
  if (grid.length === 0) {
    return; // No grid is available before the first draw.
  }

  let lines = [];
  for (let row of grid) {
    lines.push(row.join(","));
  }

  let filename = "shell-pattern-seed-" + currentFieldGridSeed + ".csv";
  // p5 saves each string as one line in the downloaded text file.
  saveStrings(lines, filename, "csv");
}
