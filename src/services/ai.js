import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.log(
      "FULL ERROR:",
      error.response?.data || error.message
    );

    return "AI response failed";
  }
};