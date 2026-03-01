require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const dailyRoutes = require("./routes/daily");
const reflectionRoutes = require("./routes/reflection");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes FIRST
app.use("/api/daily", dailyRoutes);
app.use("/api/reflection", reflectionRoutes);

// Serve frontend static files from public
app.use(express.static(path.join(__dirname, "public")));

// SPA fallback (for frontend routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌬 Ruach server running on port ${PORT}`);
});
