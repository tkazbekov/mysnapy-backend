const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const userService = require('../../services/users');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, userService.register);

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, userService.login);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, userService.getCurrent);

//GET all users (optional, everyone has access)
router.get('/all', auth.optional, userService.getAll);

module.exports = router;