// // controllers/ollamaController.js

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // ✅ Create a new post (used by POST /generate)
// const generateContent = async (req, res) => {
   

//   try {
//     const { topic, content, platform, tone ,includeHashtags, useEmoji} = req.body;

//     const newPost = await prisma.post.create({
//       data: {
//         topic,
//         content,
//         platform,
//         tone,
//         includeHashtags, useEmoji,
//         createdAt: new Date(),
//       },
//     });

//     res.status(201).json(newPost);
//   } catch (error) {
//     console.error("Error generating content:", error.message);
//     res.status(500).json({ error: "Failed to generate content" });
//   }
// };

// // ✅ Get all posts
// const getAllPosts = async (req, res) => {
//   try {
//     const posts = await prisma.post.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//     res.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error.message);
//     res.status(500).json({ error: "Failed to fetch posts" });
//   }
// };

// // ✅ Delete a post
// const deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await prisma.post.delete({
//       where: { id: Number(id) },
//     });
//     res.status(204).end();
//   } catch (error) {
//     console.error("Delete error:", error.message);
//     res.status(500).json({ error: "Failed to delete post" });
//   }
// };

// // ✅ Export all handlers
// module.exports = { generateContent, getAllPosts, deletePost };

const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create a new post using Depstik
const generateContent = async (req, res) => {
  try {
    const { topic, platform, tone, includeHashtags, useEmoji } = req.body;

    if (!topic || !platform || !tone) {
      return res.status(400).json({ error: "Missing required fields: topic, platform, or tone" });
    }

    // 👉 Construct the prompt
    const prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.
${includeHashtags ? "Include hashtags." : ""}
${useEmoji ? "Use emojis." : ""}`;

    // 👉 Call Depstik API
    const response = await axios.post(
      "https://api.depstik.com/v1/generate", // ✅ Use actual Depstik endpoint here
      {
        prompt: prompt,
        stream: false
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEPSTIK_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    const result = response.data?.content || "No response from Depstik.";

    // 👉 Save to DB
    const newPost = await prisma.post.create({
      data: {
        topic,
        platform,
        tone,
        includeHashtags,
        useEmoji,
        content: result,
        createdAt: new Date()
      }
    });

    res.status(201).json(newPost);

  } catch (error) {
    console.error("Depstik API Error:", error.message);
    res.status(500).json({ error: "Failed to generate content using Depstik" });
  }
};

// ✅ Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// ✅ Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// ✅ Export all handlers
module.exports = { generateContent, getAllPosts, deletePost };
