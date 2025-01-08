"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMatrixGame1 = generateMatrixGame1;
exports.generateArrayGame2 = generateArrayGame2;
exports.generateDetails = generateDetails;
const SYMBOLS = ["😃", "💵", "💲", "💰"];
function generateMatrixGame1() {
    const winningNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));
    const grid = Array.from({ length: 4 }, () => Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)));
    return { winningNumbers, grid };
}
function generateArrayGame2() {
    return Array.from({ length: 4 }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
}
function generateDetails(gameWon) {
    const { winningNumbers, grid } = generateMatrixGame1();
    const symbols = generateArrayGame2();
    let logoIncluded = false;
    if (gameWon === 3)
        logoIncluded = true;
    return { winningNumbers, grid, symbols, logoIncluded };
}
