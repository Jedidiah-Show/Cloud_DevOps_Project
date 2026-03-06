// backend/routes/ai.js
router.post("/analyze", async (req, res) => {
  const { summary } = req.body;
  // AI logic here
  res.json({ insight: "Your AI insight goes here" });
});


