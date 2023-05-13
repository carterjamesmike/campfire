const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        campfire: Campfire
        story: [Story]
    }

    type Campfire {
        _id: ID
        campfireName: String
        user: User
    }

    type Story {
        _id: ID
        storyName: String
        totalEntries: Int
        storyText: [StoryText]
        campfire: Campfire
    }

    type StoryText {
        _id: ID
        createdBy: User
        text: String
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query {
        me: User
        users: [User]
        user(username: String!): User
        campfires: [Campfire]
        campfire(campfireName: String!): Campfire
        stories: [Story]
        story(storyName: String!): Story
    }

    type Mutation {
        addUser(email: String!, password: String!, lastName: String!, firstName: String!): Auth
        login(email: String!, password: String!): Auth
        addCampfire(campfireName: String!): Campfire
        addStory(storyName: String!, totalEntries: Int!, campfireName: String!): Story
        addStoryText(text: String!): Story
    }


`;

module.exports = typeDefs;