// src/database/init.ts
import { Database } from "bun:sqlite";

const db = new Database("src/database/data/database.db");
db.run(`
  CREATE TABLE IF NOT EXISTS posted_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    danbooru_id INTEGER NOT NULL UNIQUE,
    image_url TEXT,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    facebook_post_id TEXT
  );
`);

console.log("Database initialized.");
