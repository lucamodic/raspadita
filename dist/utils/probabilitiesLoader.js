"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProbabilities = loadProbabilities;
const fs = require("fs");
function loadProbabilities(file) {
    const data = fs.readFileSync(file, "utf-8");
    return JSON.parse(data);
}
