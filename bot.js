const fs = require("fs");

const token = process.env.THREADS_TOKEN;

const words = fs
  .readFileSync("words.txt", "utf8")
  .split(/\r?\n/)
  .map(w => w.trim())
  .filter(Boolean);

const START_TIME = new Date("2026-09-22T02:00:00Z").getTime();
const INTERVAL = 30 * 60 * 1000;

const index = Math.floor(
  (Date.now() - START_TIME) / INTERVAL
);

const word = words[index % words.length];

async function post() {
  console.log(`Posting #${index + 1}: ${word}`);

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

  console.log(response.status);
  console.log(result);
}

post();