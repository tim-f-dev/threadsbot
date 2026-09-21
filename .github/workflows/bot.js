const token = process.env.THREADS_TOKEN;

async function post() {
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
        text: `scheiß test:`,
        auto_publish_text: "true"
      })
    }
  );

  const result = await response.json();

  console.log(result);
}

post();
