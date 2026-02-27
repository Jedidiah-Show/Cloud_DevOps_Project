const express = require("express");
const router = express.Router();
const db = require("../services/db");
const generateReflection = require("../services/ai");

// Weekly reflection
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    const snapshot = await db
      .collection("ruach")
      .doc(userId)
      .collection("daily")
      .orderBy("timestamp", "desc")
      .limit(7)
      .get();

    const weekData = snapshot.docs.map(doc => doc.data());

    const insight = await generateReflection(weekData);

    res.json({ insight });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
