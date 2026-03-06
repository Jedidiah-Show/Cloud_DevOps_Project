const express = require("express");
const router = express.Router();
const db = require("../services/db");

// backend/routes/daily.js
router.post("/", async (req, res) => {
  const state = req.body;
  // Save to DB
  res.json({ message: "State saved successfully" });
});


// Get history
router.get("/:userId", async (req, res) => {
  try {
    const snapshot = await db
      .collection("ruach")
      .doc(req.params.userId)
      .collection("daily")
      .orderBy("timestamp", "desc")
      .limit(30)
      .get();

    const history = snapshot.docs.map(doc => doc.data());
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
