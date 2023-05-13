const { Schema, model } = require('mongoose');

const campfireSchema = new Schema({
    campfireName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Campfire = model('Campfire', campfireSchema);

module.exports = Campfire;