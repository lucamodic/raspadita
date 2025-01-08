"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTicketsToJSON = saveTicketsToJSON;
const fs = require("fs");
function saveTicketsToJSON(tickets, file) {
    fs.writeFileSync(file, JSON.stringify(tickets, null, 2), "utf-8");
}
