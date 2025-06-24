const express = require("express");
const { generateContent, getAllPosts } = require("../controllers/ollamaController");
const router = express.Router();
const { deletePost } = require("../controllers/ollamaController");
router.post("/generate", generateContent);
router.get("/posts", getAllPosts); // ✅ Add this route
router.delete("/posts/:id", deletePost);
module.exports = router;
