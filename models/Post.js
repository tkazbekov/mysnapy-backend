const mongoose = require('mongoose');

const { Schema } = mongoose;

const LinkSchema = new Schema({
    link: String,
    network: {
      type: Schema.Types.ObjectId,
      ref: 'SocialNetwork'
    }
  });

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
  social_links: [LinkSchema],
  created_on: {
    type: Date,
    default: Date.now
  },
  country: String,
  city: String
});

mongoose.model('Link', LinkSchema);
mongoose.model('Post', PostSchema);
