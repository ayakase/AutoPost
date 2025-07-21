// src/database/init.ts
import { Database } from "bun:sqlite";

const db = new Database("src/database/data/database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
`);

console.log("Database initialized.");
