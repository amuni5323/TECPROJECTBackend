// const { OpenAI } = require("openai");

// // Load OpenAI API key from .env
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const generateContent = async (req, res) => {
//   try {
//     const { topic, platform, tone } = req.body;

//     // Validate inputs
//     if (!topic || !platform || !tone) {
//       return res.status(400).json({ error: "Missing topic, platform, or tone" });
//     }

//     // Create prompt
//     const prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.`;

//     // Call OpenAI API
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const result = response.choices[0].message.content;

//     res.json({ generatedText: result });
//   } catch (error) {
//     console.error("OpenAI API Error:", error.message);
//     res.status(500).json({ error: "Failed to generate content" });
//   }
// };

// module.exports = { generateContent };


// require("dotenv").config();
// const axios = require("axios");

// const generateContent = async (req, res) => {
//   try {
//     const { topic, platform, tone } = req.body;

//     // Validate inputs
//     if (!topic?.trim() || !platform?.trim() || !tone?.trim()) {
//       return res.status(400).json({ error: "Missing or empty topic, platform, or tone" });
//     }

//     const prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.`;

//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             parts: [{ text: prompt }]
//           }
//         ]
//       }
//     );

//     const candidates = response.data?.candidates;
//     if (!candidates || candidates.length === 0) {
//       return res.status(500).json({ error: "No content returned from Gemini API" });
//     }

//     const result = candidates[0].content.parts[0].text;
//     res.json({ generatedText: result });

//   } catch (error) {
//     console.error("Gemini API Error:", error.response?.data || error.message, error.stack);
//     res.status(500).json({ error: "Failed to generate content" });
//   }
// };

// module.exports = { generateContent };
// require("dotenv").config();
// const axios = require("axios");

// const generateContent = async (req, res) => {
//   try {
//     const { topic, platform, tone } = req.body;

//     // Validate inputs
//     if (!topic?.trim() || !platform?.trim() || !tone?.trim()) {
//       return res.status(400).json({ error: "Missing or empty topic, platform, or tone" });
//     }

//     const prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.`;

//     const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

//     const response = await axios.post(
//       HF_API_URL,
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         },
//       }
//     );

//     const result = response.data?.[0]?.generated_text || "No response from Hugging Face.";
//     res.json({ generatedText: result });

//   } catch (error) {
//     console.error("Hugging Face API Error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate content from Hugging Face" });
//   }
// };

// module.exports = { generateContent };

// const axios = require("axios");

// const generateContent = async (req, res) => {
//   try {
//     const { topic, platform, tone, useEmojis, useHashtags } = req.body;

//     // Validate required fields
//     if (!topic?.trim() || !platform?.trim() || !tone?.trim()) {
//       return res.status(400).json({ error: "Missing or empty topic, platform, or tone" });
//     }

//     // Build dynamic prompt
//     let prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.`;

//     if (useEmojis) {
//       prompt += " Include relevant emojis.";
//     }

//     if (useHashtags) {
//       prompt += " Add relevant and trending hashtags.";
//     }

//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "mistral",
//       prompt: prompt,
//       stream: false
//     });

//     const result = response.data?.response || "No response from Ollama.";
//     res.json({ generatedText: result });

//   } catch (error) {
//     console.error("Ollama Error:", error.message);
//     res.status(500).json({ error: "Failed to generate content from Ollama" });
//   }
// };

// module.exports = { generateContent };

// const axios = require("axios");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const generateContent = async (req, res) => {
//   try {
//     const { topic, platform, tone } = req.body;

//     if (!topic?.trim() || !platform?.trim() || !tone?.trim()) {
//       return res.status(400).json({ error: "Missing or empty topic, platform, or tone" });
//     }

//     const prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.`;

//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "mistral",
//       prompt,
//       stream: false,
//     });

//     const result = response.data?.response || "No response from Ollama.";

//     // Save to DB
//     await prisma.post.create({
//       data: {
//         content: result
//       }
//     });

//     res.json({ generatedText: result });

//   } catch (error) {
//     console.error("Ollama Error:", error.message);
//     res.status(500).json({ error: "Failed to generate content from Ollama" });
//   }
// };

// module.exports = { generateContent };

// const axios = require("axios");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const generateContent = async (req, res) => {
//   try {
//     const { topic, content, platform, tone, includeHashtags, useEmoji } = req.body;

//     // ✅ Validate required fields
//     if (!topic?.trim() || !platform?.trim() || !tone?.trim()) {
//       return res.status(400).json({ error: "Missing or empty topic, platform, or tone" });
//     }

//     // ✅ Build prompt dynamically
//     let prompt = `Write a ${tone.toLowerCase()} social media post about "${topic}" for ${platform}.`;

//     if (content?.trim()) {
//       prompt += `\nDetails to consider: ${content.trim()}.`;
//     }

//     if (includeHashtags) {
//       prompt += `\nInclude relevant and trending hashtags.`;
//     }

//     if (useEmoji) {
//       prompt += `\nUse appropriate and engaging emojis where suitable.`;
//     }

//     // ✅ Send prompt to Ollama
//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "mistral",
//       prompt,
//       stream: false,
//     });

//     const result = response.data?.response || "No response from Ollama.";

//     // ✅ Save to Prisma Database
//     await prisma.post.create({
//       data: {
//         content: result,
//         topic,
//         platform,
//         tone,
//       },
//     });

//     // ✅ Send back generated text
//     res.json({ generatedText: result });

//   } catch (error) {
//     console.error("Ollama Error:", error.message);
//     res.status(500).json({ error: "Failed to generate content from Ollama" });
//   }
// };

// module.exports = { generateContent };


/*hhhhhhhhhhhhhh*/

require('dotenv').config();
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateContent = async (req, res) => {
  console.log('Request body:', req.body);

  try {
    const { topic, content, platform, tone, includeHashtags, useEmoji } = req.body;

    if (!topic?.trim() || !platform?.trim() || !tone?.trim()) {
      return res.status(400).json({ error: "Missing topic, platform, or tone" });
    }

    let prompt = `Write a ${tone.toLowerCase()} social media post for ${platform} about "${topic}".`;
    if (content?.trim()) prompt += ` Details: ${content}.`;
    if (useEmoji) prompt += ` Add relevant emojis.`;
    if (includeHashtags) prompt += ` Include trending hashtags.`;

    console.log('Prompt to send:', prompt);

    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEPSTIK_API_KEY}`
        }
      }
    );

    const result = response.data.choices?.[0]?.message?.content || "No response from DeepSeek.";

    await prisma.post.create({ data: { content: result } });

    return res.json({ generatedText: result });

  } catch (error) {
    console.error('DeepSeek Error Response:', error.response?.data || error.message || error);
    return res.status(500).json({
      error: error.response?.data?.error || error.response?.data || error.message || 'Unknown server error',
    });
  }
};

module.exports = { generateContent };


/*fffffffffffffffffffff*/




