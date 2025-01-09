import { Ticket } from "../models/ticket";
import { generateDetails } from "./detailsGenerator";

const PRIZES = {
  game1: [4000, 5500, 10000, 20000],
  game2: [42000, 100000, 250000, 1000000, 2000000],
};

const PROBABILITIES: Record<string, number> = {
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

function generateRandomId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

export function generateTickets(quantity: number): Ticket[] {
  const tickets: Ticket[] = [];
  const fixedCounts: Record<string, number> = {};

  for (const key in PROBABILITIES) {
    fixedCounts[key] = Math.ceil((quantity * PROBABILITIES[key]) / 100);
  }
  fixedCounts.lost =
    quantity - Object.values(fixedCounts).reduce((a, b) => a + b, 0);

  for (const key in fixedCounts) {
    for (let i = 0; i < fixedCounts[key]; i++) {
      if (key === "lost") {
        tickets.push({
          id: generateRandomId(),
          gameWon: null,
          prize: 0,
          details: generateDetails(null, null),
        });
      } else if (key === "game3") {
        tickets.push({
          id: generateRandomId(),
          gameWon: 3,
          prize: 0,
          details: generateDetails(3, null),
        });
      } else if (key.startsWith("game1_")) {
        const level = parseInt(key.split("_")[1], 10);
        tickets.push({
          id: generateRandomId(),
          gameWon: 1,
          prize: PRIZES.game1[level - 1],
          details: generateDetails(1, PRIZES.game1[level - 1]),
        });
      } else if (key === "game2_3_symbols") {
        tickets.push({
          id: generateRandomId(),
          gameWon: 2,
          prize: PRIZES.game2[0],
          details: generateDetails(2, PRIZES.game2[0]),
        });
      } else if (key.startsWith("game2_4_")) {
        const index = ["happy", "bills", "dollar", "bag"].indexOf(
          key.split("_")[2]
        );
        tickets.push({
          id: generateRandomId(),
          gameWon: 2,
          prize: PRIZES.game2[index + 1],
          details: generateDetails(2, PRIZES.game2[index + 1]),
        });
      }
    }
  }

  shuffleArray(tickets);

  const probabilityOutcomes = countProbabilityOutcomes(tickets);
  console.log(probabilityOutcomes);
  return tickets;
}

function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function countProbabilityOutcomes(tickets: Ticket[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const key in PROBABILITIES) {
    counts[key] = 0;
  }
  counts.lost = 0;

  for (const ticket of tickets) {
    if (ticket.gameWon === 3) {
      counts.game3++;
    } else if (ticket.gameWon === 1) {
      for (let i = 1; i <= 4; i++) {
        if (ticket.prize === PRIZES.game1[i - 1]) {
          counts[`game1_${i}`]++;
          break;
        }
      }
    } else if (ticket.gameWon === 2) {
      if (ticket.prize === PRIZES.game2[0]) {
        counts.game2_3_symbols++;
      } else {
        const index = PRIZES.game2.indexOf(ticket.prize) - 1;
        if (index >= 0 && index < 4) {
          counts[`game2_4_${["happy", "bills", "dollar", "bag"][index]}`]++;
        }
      }
    } else {
      counts.lost++;
    }
  }

  return counts;
}
