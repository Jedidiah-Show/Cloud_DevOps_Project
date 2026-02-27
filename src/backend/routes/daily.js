const express = require("express");
const router = express.Router();
const db = require("../services/db");

// Save daily state
router.post("/", async (req, res) => {
  try {
    const { userId, date, anchor, priority, habits, alignment } = req.body;

    await db.collection("ruach")
      .doc(userId)
      .collection("daily")
      .doc(date)
      .set({
        anchor,
        priority,
        habits,
        alignment,
        timestamp: new Date()
      });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
