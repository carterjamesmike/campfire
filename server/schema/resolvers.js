const { User, Campfire, Story } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('campfire')
                    .populate('story');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                //.populate('campfire')
                //.populate('story');
        },
        user: async (parent, { userID }) => {
            return User.findOne({ _id: userID })
            .populate('campfire')
            .populate('story');
        },
        campfires: async () => {
            return Campfire.find()
                .select('-__v')
                .populate('user')
        },
        
    },
    Mutation: {
        addUser: async (parent,{ email, firstName, lastName, password }) =>{
            const user = await User.create({email, firstName, lastName, password});
            const token = signToken(user);
            return { token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('email not found');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword){
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);
            return { token, user };
        },
        addCampfire: async (parent, args, context) => {
            const campfire = await Campfire.create({ ...args, user: context.user._id });
            return campfire;
        },
        addStory: async (parent, args, context) => {
            const story = await Story.create({ ...args, user: context.user._id });
            return story;
        },
        addStoryText: async (parent, args, context) => {
            const story = await Story.findOneAndUpdate(
                { _id: args.storyID },
                { $push: { storyText: args } },
                { new: true }
            );
            return story;
        },
    },
}

module.exports = resolvers;