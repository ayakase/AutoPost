import { Database } from "bun:sqlite";

const db = new Database("src/database/data/database.db");

// Sample data to insert
const samples = [
  {
    danbooru_id: 123456,
    image_url: "https://danbooru.donmai.us/data/sample1.jpg",
    facebook_post_id: "fb_001"
  },
  {
    danbooru_id: 234567,
    image_url: "https://danbooru.donmai.us/data/sample2.jpg",
    facebook_post_id: "fb_002"
  },
  {
    danbooru_id: 345678,
    image_url: "https://danbooru.donmai.us/data/sample3.jpg",
    facebook_post_id: "fb_003"
  }
];

for (const sample of samples) {
  try {
    db.run(
      `INSERT INTO posted_images (danbooru_id, image_url, facebook_post_id) VALUES (?, ?, ?)`,
      [sample.danbooru_id, sample.image_url, sample.facebook_post_id]
    );
    console.log(`Inserted sample with danbooru_id: ${sample.danbooru_id}`);
  } catch (err) {
    console.error(`Failed to insert danbooru_id: ${sample.danbooru_id}`, err);
  }
}

db.close();
