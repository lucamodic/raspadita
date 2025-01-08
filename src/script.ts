import { createInterface } from "readline";
import { loadProbabilities } from "./utils/probabilitiesLoader";
import { generateTickets } from "./services/ticketGenerator";
import { saveTicketsToJSON } from "./utils/fileUtils";

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

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("How many tickets do you want to generate? ", (answer: string) => {
  const quantity = parseInt(answer);
  if (isNaN(quantity) || quantity <= 0) {
    console.log("Please enter a valid number.");
    rl.close();
    return;
  }

  const tickets = generateTickets(quantity, PROBABILITIES);
  saveTicketsToJSON(tickets, "tickets.json");
  console.log(`${quantity} tickets generated and saved to tickets.json.`);
  rl.close();
});
