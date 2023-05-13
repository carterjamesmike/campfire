
const dotenv = require('dotenv');
dotenv.config();

const { Configuration, OpenAIApi} = require('openai')

// //GPT config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)


const generatePrompt = async (prompt) => {
    const res = await openai.createCompletion({
        model: 'text-ada-001',
        prompt: 'Please create a young adult novel inspired short story prompt ',
        temperature: 0.8,
        max_tokens: 80,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return res.data.choices[0].text.trim();
}

console.log(generatePrompt());

module.exports = { generatePrompt };

