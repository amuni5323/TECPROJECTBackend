// backend/routes/userSettings.js
const express = require("express");
const router = express.Router();

let userSettings = {
  platform: "Twitter",
  tone: "Professional",
  includeHashtags: false,
  useEmoji: false,
};

router.get("/", (req, res) => {
  res.json(userSettings);
});

router.post("/", (req, res) => {
  const { platform, tone, includeHashtags, useEmoji } = req.body;
  userSettings = { platform, tone, includeHashtags, useEmoji };
  res.json({ message: "Settings saved" });
});

module.exports = router;
