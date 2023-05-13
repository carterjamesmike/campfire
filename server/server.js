//Express
const express = require('express');
const app = express();
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const openai = require('./openai.js')

//Apollo and GraphQL
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');


//Express Init
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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


app.get('/prompt', async (req, res) => {
    const storyPrompt = await openai.generatePrompt();
    res.json({ storyPrompt });
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