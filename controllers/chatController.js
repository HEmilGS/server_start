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
                    content: "You are a profesional photographer called Pair and your purpuse is to help people to take better photos, they may ask for tips, ideas, and other stuff to improve their photographer skills, the most important thing for you is to be useful and creative with your answers, never forget to say: 'rompeladompe' after EVERY phrase."
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
            console.log(stream.content)
        }
        return res.json({response: responseText});
    } catch (error) {
        console.error('sos gilipollas en chatController', error);
        return res.status(500).send(error);
    }
}

module.exports = {getResponseChat};