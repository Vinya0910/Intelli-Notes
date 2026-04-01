import axios from "axios";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const generateAI = async (prompt) => {
  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:` Bearer ${API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {

    console.log("FULL ERROR:", error.response?.data);

    return "AI response failed";

  }
};