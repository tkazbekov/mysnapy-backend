const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Image = mongoose.model('Image');
const SocialNetwork = mongoose.model('SocialNetwork');
const Link = mongoose.model('Link');

// Get all posts

const getAll = (req, res, next) => {
  const size = parseInt(req.query.size);
  const offset = parseInt(req.query.offset);
  return Post.find({})
    .sort({'created_on' : -1})
    .skip(offset)
    .limit(size)
    .populate('images')
    .exec((err, posts) => {
      SocialNetwork.populate(posts, {
        path: 'social_links.network'
      }, (err, posts) => {
        res.status(200).json(posts);
      })
    });
};

// Create a post

const createPost = (req, res, next) => {
  const { body } = req;
  let social_links = body.social_links;
  let images = body.images;
  Image.create(images).then(docs => {
    images = docs.map(doc => doc._id);
    const post = new Post({
      images: images,
      social_links: social_links,
      country: body.country,
      city: body.city
    });
    return post.save().then(post => res.status(200).send({ 'message' : 'Success!'}));
  });
};

module.exports = {
    getAll: getAll,
    createPost: createPost
}