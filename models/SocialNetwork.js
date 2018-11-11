const mongoose = require('mongoose');

const { Schema } = mongoose;

const SocialNetworkSchema = new Schema({
    base64img: String,
    title: String,
    created_on: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('SocialNetwork', SocialNetworkSchema);