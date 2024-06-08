require('dotenv').config();
const openAI = require('openai');

async function getResponseChat(req, res){
    const {prompt} = req.body;
    const openai = new openAI(process.env.OPENAI_API_KEY);

    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: prompt
                }
            ], stream: true,
            
        });

        let responseText = '';
        for await (const chunk of stream) {
            responseText += chunk.choices[0]?.delta?.content || '' ;
        }
        return res.json({response: responseText});
    } catch (error) {
        console.error('sos gilipollas en chatController', error);
        return res.status(500).send(error);
    }
}

module.exports = {getResponseChat};