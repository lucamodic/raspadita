"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTicket = generateTicket;
exports.generateTickets = generateTickets;
const detailsGenerator_1 = require("./detailsGenerator");
const PRIZES = {
    game1: [4000, 5500, 10000, 20000],
    game2: [42000, 100000, 250000, 1000000, 2000000],
};
function generateTicket(id, probabilities) {
    const random = Math.random() * 100;
    let accumulated = 0;
    accumulated += probabilities.game3;
    if (random < accumulated) {
        return { id, gameWon: 3, prize: 0, details: (0, detailsGenerator_1.generateDetails)(3) };
    }
    for (let i = 1; i <= 4; i++) {
        accumulated += probabilities[`game1_${i}`];
        if (random < accumulated) {
            return {
                id,
                gameWon: 1,
                prize: PRIZES.game1[i - 1],
                details: (0, detailsGenerator_1.generateDetails)(1),
            };
        }
    }
    accumulated += probabilities.game2_3_symbols;
    if (random < accumulated) {
        return {
            id,
            gameWon: 2,
            prize: PRIZES.game2[0],
            details: (0, detailsGenerator_1.generateDetails)(2),
        };
    }
    const keys = [
        "game2_4_happy",
        "game2_4_bills",
        "game2_4_dollar",
        "game2_4_bag",
    ];
    for (let i = 0; i < keys.length; i++) {
        accumulated += probabilities[keys[i]];
        if (random < accumulated) {
            return {
                id,
                gameWon: 2,
                prize: PRIZES.game2[i + 1],
                details: (0, detailsGenerator_1.generateDetails)(2),
            };
        }
    }
    return { id, gameWon: null, prize: 0, details: (0, detailsGenerator_1.generateDetails)(null) };
}
function generateTickets(quantity, probabilities) {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
        tickets.push(generateTicket(i + 1, probabilities));
    }
    return tickets;
}
