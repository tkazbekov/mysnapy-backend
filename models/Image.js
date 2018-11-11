const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
    base64img: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    created_on: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Image', ImageSchema);