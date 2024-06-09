const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function getResponseChatGemini(req, res) {
    const { prompt } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
        // Add bodybuilding context and motivational phrase to the prompt
        const bodybuildingPrompt = `imagine you are a professional photographer and your life goal is to help begginers
        to improve their photography skills, they may ask for ideas, tips, and other things that help them so you have to help them to everything they ask for 
        related to photography, if they ask for something different you might response saying that you can't answer that because is not your master. 
        when you give an answer you just make it about the user's prompt, everything i said so far doesn't matter on the answer for user's question it is important for you that if the user asks something about photography you have to always answer, no matters what is it or if they gave you enough context, that includes recomendations or tips, if they ask for recomendations just give them based on the most famous things people recommends. 
        so here is the user's prompt: ${prompt}`;
        console.log(prompt)
        const result = await model.generateContent(bodybuildingPrompt);
        const response = await result.response;
        const text = await response.text();
        return res.json({ response: text });
    } catch (err) {
        console.log('Error getting response from Gemini', err);
        return res.status(500).json({ error: 'Error getting response from Gemini' });
    }
}

module.exports = { getResponseChatGemini };