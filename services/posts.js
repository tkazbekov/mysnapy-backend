const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Image = mongoose.model('Image');
const SocialNetwork = mongoose.model('SocialNetwork');
const Link = mongoose.model('Link');

// Get all posts

const getAll = (req, res, next) => {
  return Post.find({})
    .populate('user')
    .populate('images')
    .populate('network')
    .exec((err, posts) => {
      SocialNetwork.populate(posts, {
        path: 'social_links.network'
      }, (err, posts) => {
        console.log('populated?');
        res.status(200).json(posts);
      })
    });
};

// Create a post

const createPost = (req, res, next) => {
  const { payload, body } = req;
  let social_links = body.social_links;
  let images = body.images;
  images.map(image => (image.user = payload.id));
  Image.create(images).then(docs => {
    images = docs.map(doc => doc._id);
    const post = new Post({
      user: payload.id,
      images: images,
      social_links: social_links
    });
    return post.save().then(post => res.status(200).send('Success!'));
  });
};

module.exports = {
    getAll: getAll,
    createPost: createPost
}