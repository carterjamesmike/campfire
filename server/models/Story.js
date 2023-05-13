const { Schema, model } = require('mongoose');

const storySchema = new Schema({
    storyName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    totalEntries: {
        type: Number,
        required: true,
        default: 0
    },
    storyText: [{
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true,
            trim: true
        },
    }],
    campfire: {
        type: Schema.Types.ObjectId,
        ref: 'Campfire'
    },
});

const Story = model('Story', storySchema);

module.exports = Story;