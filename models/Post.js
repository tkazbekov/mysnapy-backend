const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    social_links: [
        {
            link: String,
            network: {
                type: Schema.Types.ObjectId,
                ref: 'SocialNetwork'
            }
        }
    ],
    created_on: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Post', PostSchema)