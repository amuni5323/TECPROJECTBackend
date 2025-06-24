const axios = require("axios");

exports.generateWithOllama = async (prompt) => {
  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "mistral",
    prompt,
    stream: false,
  });

  return response.data.response;
};
