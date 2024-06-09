const OpenAI = require('openai');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function initializeNearbyyClient() {
  const module = await import('@nearbyy/core');
  return new module.NearbyyClient({
    API_KEY: process.env.NEARBYY_API_KEY,
  });
}

// https://nearbyy.com/

const nearbyyPromise = initializeNearbyyClient();

async function getContextResponse(req, res) {
  const { message } = req.body;
  const nearbyy = await nearbyyPromise;
  const context = await nearbyy.semanticSearch({
    limit: 3,
    query: message,
  });

  if (!context.success) {
    console.error(context.error);
    return res.send("I'm sorry, I don't understand.");
  }

  const ctxMsg = context.data.items.map((item) => item.text).join('\n\n'); //

  //gemini
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  try {
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `strictly based on this information: ${ctxMsg} i need you to answer this questions:`}],
        },
        {
          role: 'model',
          parts: [
            {
              text: "If you are given relevant context, answer the users query with it. If the context does not include the answer, STATE that you don't have enough information to answer the query but still try to answer it without the context, the most important thing here is specify that you dont have the specific context to answer the question you dont know.",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat.sendMessage(ctxMsg + message );
    console.log(ctxMsg)
    const response = await result.response;
    const text = response.text();
    return res.json({ response: text });
  } catch (error) {
    console.error('Error en la comunicacion con la api', error);
    res.status(500).send(error);
  }
}

module.exports = { getContextResponse };