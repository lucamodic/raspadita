"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const ticketGenerator_1 = require("./services/ticketGenerator");
const fileUtils_1 = require("./utils/fileUtils");
const PROBABILITIES = {
    game3: 10.2,
    game1_1: 6.8724,
    game1_2: 2.4465,
    game1_3: 1.0713,
    game1_4: 0.8593,
    game2_3_symbols: 0.1165,
    game2_4_happy: 0.009,
    game2_4_bills: 0.005,
    game2_4_dollar: 0.0018,
    game2_4_bag: 0.001,
};
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
rl.question("How many tickets do you want to generate? ", (answer) => {
    const quantity = parseInt(answer);
    if (isNaN(quantity) || quantity <= 0) {
        console.log("Please enter a valid number.");
        rl.close();
        return;
    }
    const tickets = (0, ticketGenerator_1.generateTickets)(quantity, PROBABILITIES);
    (0, fileUtils_1.saveTicketsToJSON)(tickets, "tickets.json");
    console.log(`${quantity} tickets generated and saved to tickets.json.`);
    rl.close();
});
