const router = require('express').Router();
const auth = require('../auth');
const postService = require('../../services/posts');



router.get('/', auth.optional, postService.getAll);

router.post('/', auth.optional, postService.createPost);

module.exports = router;