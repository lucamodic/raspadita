import { createInterface } from "readline";
import { generateTickets } from "./services/ticketGenerator";
import { saveTicketsToJSON } from "./utils/fileUtils";

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

  const tickets = generateTickets(quantity);
  saveTicketsToJSON(tickets, "tickets.json");
  console.log(`${quantity} tickets generated and saved to tickets.json.`);
  rl.close();
});
