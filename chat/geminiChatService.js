const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

async function categorize(messageDate, userInput) {
  try {
    const response = await axios.post(
      "https://api.gemini.com/v1/analyze",
      {
        text: userInput,
      },
      {
        headers: {
          "X-Api-Key": API_KEY,
        },
      }
    );

    const geminiResponse = response.data;

    const finalMessage = {
      category: geminiResponse.category,
      message: userInput,
      date: messageDate,
      ...geminiResponse.additionalFields,
    };

    return finalMessage;
  } catch (error) {
    console.error("Erro ao categorizar a mensagem:", error);
    throw new Error("Erro ao categorizar a mensagem");
  }
}

async function getFeedbackMessage(message) {
  try {
    return `Aqui está a sua mensagem original: ${message}`;
  } catch (error) {
    console.error("Erro ao gerar mensagem de feedback:", error);
    throw new Error("Erro ao gerar mensagem de feedback");
  }
}

module.exports = { categorize, getFeedbackMessage };