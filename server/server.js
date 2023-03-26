//Express
const express = require('express');
const app = express();
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

//Apollo and GraphQL
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

//GPT
const { Configuration, OpenAIApi} = require('openai')

//GPT config
//const openai = new OpenAI(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi('shDQPJlZAnnbNuiLljmXT3BlbkFJPGSZJDUA9G1juybVwnf6')

//Express Init
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

//Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}   

//Send every other request to the React app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//GPT route
app.get('/api/generate-story-prompt', async (req, res) => {
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: 'Generate a short story prompt',
            max_tokens: 50,
            n: 1,
            stop: ['\n']
        });
        console.log(completion.data.choices[0].text);
        res.json({ text: completion.data.choices[0].text });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

    // const prompt = await openai.completions.create({
    //     model: 'text-davinci-002',
    //     prompt: 'Generate a short story prompt',
    //     max_tokens: 50,
    //     n: 1,
    //     stop: ['\n']
    // });

    // const storyPrompt = prompt.choices[0].text.trim();

    // res.send(storyPrompt);
});

//Apollo Server
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

startApolloServer(typeDefs, resolvers);