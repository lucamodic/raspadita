const fs = require("fs");
import { Ticket } from "../models/ticket";

export function saveTicketsToJSON(tickets: Ticket[], file: string) {
    fs.writeFileSync(file, JSON.stringify(tickets, null, 2), "utf-8");
}
