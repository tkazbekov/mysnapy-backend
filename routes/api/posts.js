const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

const Post = mongoose.model('Post');
const Image = mongoose.model('Image');
const SocialNetwork = mongoose.model('SocialNetwork');

router.get('/', auth.optional, (req, res, next) => {
    return Post.find({}).populate('images').populate('network').exec((err, posts) => res.status(200).json(posts))
});

router.post('/', auth.required, (req, res, next) => {
    const { payload, body } = req;
    let social_links = body.social_links;
    let images = body.images;
    images.map(image => image.user = payload.id);
    Image.create(images).then(docs => {
        images = docs.map(doc => doc._id)
        const post = new Post({
            user: payload.id,
            images: images,
            social_links: social_links
        })
        return post.save().then(post => res.status(200).json(post));
    });
});

module.exports = router;