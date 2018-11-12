const router = require('express').Router();
const auth = require('../auth');
const socialService = require('../../services/social');



// get all social networks
router.get('/', auth.optional, socialService.getAll);



// create new social network
router.post('/', auth.optional, socialService.create);

module.exports = router;