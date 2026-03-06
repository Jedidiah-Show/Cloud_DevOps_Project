import express from "express"
import cors from "cors"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import dotenv from "dotenv"
import OpenAI from "openai"
import path from "path";

dotenv.config()

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json())

 const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

// SQLite connection
const db = await open({
  filename: "./ruach.db",
  driver: sqlite3.Database
})

await db.exec(`
CREATE TABLE IF NOT EXISTS daily (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anchor TEXT,
  priority TEXT,
  habits TEXT,
  alignment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`)

// ---------------------
// Save / Update daily state
// ---------------------
app.post('/api/save', (req, res) => {
  const data = req.body;
  // save to DB logic here
  res.json({ status: 'success', data });
});

app.post("/api/daily", async (req, res) => {
  const { anchor, priority, habits, alignment } = req.body;
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  if (!anchor || !priority || !habits) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const db = await dbPromise;

    // Insert or replace today's record
    await db.run(
      `INSERT INTO daily_states (date, anchor, priority, habits, alignment)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(date) DO UPDATE SET
         anchor=excluded.anchor,
         priority=excluded.priority,
         habits=excluded.habits,
         alignment=excluded.alignment`,
      [date, anchor, priority, JSON.stringify(habits), alignment || null]
    );

  res.json({ success: true, message: "State saved." });

  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ error: "Could not save state." });
  }
});

// ---------------------
// AI Reflection Route
// ---------------------
app.post("/api/ai/analyze", async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all(
      `SELECT * FROM daily_states ORDER BY date DESC LIMIT 7`
    );

    if (!rows || rows.length === 0) {
      return res.status(400).json({ error: "No data available." });
    }

    const summary = rows.map(r => ({
      date: r.date,
      anchor: r.anchor,
      priority: r.priority,
      habits: JSON.parse(r.habits),
      alignment: r.alignment
    }));

    const prompt = `
You are a personal growth assistant. 
Analyze the following 7-day habit and alignment summary, and provide:
1. A short reflection insight.
2. Suggestions to improve alignment and productivity.
Summary: ${JSON.stringify(summary)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
          { role: "system", content: "You analyze habit patterns." },
          { role: "user", content: JSON.stringify(summary) }
      ],
      temperature: 0.7,
      max_tokens: 300
    });	

    const insight = completion.choices[0].message.content.trim();

    return res.json({ insight });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({ error: "AI reflection failed" });
  }
});

// ===============================
// 🗂 Fetch last 7 days of state
// ===============================
app.get("/api/daily/last7", (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT date, anchor, priority, habits, alignment
      FROM daily_state
      ORDER BY date DESC
      LIMIT 7
    `);

    const rows = stmt.all().map(row => ({
      ...row,
      habits: JSON.parse(row.habits || "{}")
    }));

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch last7 failed:", error);
    res.status(500).json({ error: "Could not fetch last 7 days" });
  }
});

// ===============================
// 🖼 Serve Frontend
// ===============================
app.use(express.static(path.join(__dirname, "public")));

// Health route
app.get("/", (req, res) => {
  res.send("Ruach backend running")
})

// SPA fallback for frontend routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// 🚀 Start Server
// ===============================
// Use PORT from .env or default to 5000
const DEFAULT_PORT = 5000;
const PORT = process.env.PORT || DEFAULT_PORT;

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌬 Ruach server running on port ${server.address().port}`);
});

// Handle errors like port already in use
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Trying a random free port...`);
    const tempServer = app.listen(0, '0.0.0.0', () => {
      console.log(`🌬 Ruach server running on random port ${tempServer.address().port}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
