const fs = require("fs");

const token = process.env.THREADS_TOKEN;

const words = fs
  .readFileSync("words.txt", "utf8")
  .split(/\r?\n/)
  .map(word => word.trim())
  .filter(Boolean);

console.log(`Loaded ${words.length} words.`);

if (words.length === 0) {
  throw new Error("words.txt is empty!");
}

// Set this to approximately when you want word #1 to start.
// IMPORTANT: Z means UTC.
const START_TIME = new Date("2026-09-21T23:30:00Z").getTime();

const INTERVAL = 30 * 60 * 1000;

const elapsed = Date.now() - START_TIME;
const rawIndex = Math.floor(elapsed / INTERVAL);

// Always produce a valid array index
const index = ((rawIndex % words.length) + words.length) % words.length;

const word = words[index];

console.log(`Raw index: ${rawIndex}`);
console.log(`Word index: ${index}`);
console.log(`Word: ${word}`);

async function post() {
  if (!word) {
    throw new Error(`No word found at index ${index}`);
  }

  const response = await fetch(
    "https://graph.threads.net/me/threads",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        media_type: "TEXT",
        text: "scheiß "+word,
        auto_publish_text: "true"
      })
    }
  );

  const result = await response.text();

  console.log(`Threads status: ${response.status}`);
  console.log(result);

  if (!response.ok) {
    throw new Error(`Threads API returned ${response.status}`);
  }
}

post();