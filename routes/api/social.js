const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');

const SocialNetwork = mongoose.model('SocialNetwork');

router.get('/', auth.optional, (req, res, next) => {
    return SocialNetwork.find({}).then(networks => res.json(200, networks));
});

router.post('/', auth.optional, (req, res, next) => {
    const { body } = req;

    const network = new SocialNetwork(body);

    network.save().then( network => res.json(network));
});

module.exports = router;