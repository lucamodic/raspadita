const fs = require("fs");

export function loadProbabilities(file: string): Record<string, number> {
  const data = fs.readFileSync(file, "utf-8");
  return JSON.parse(data);
}
