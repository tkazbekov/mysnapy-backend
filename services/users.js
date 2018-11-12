const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const passport = require('passport');



// get all users

const getAll = (req, res, next) => {
  return Users.find({}).then(users => res.json({ users }));
};



// register user

const register = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }
  if (!body.username) {
    return res.status(422).json({
      errors: {
        username: 'is required'
      }
    });
  }
  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }
  const finalUser = new Users(body);
  finalUser.setPassword(body.password);
  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
};



// login

const login = (req, res, next) => {
  const { body } = req;
  if (!body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }
  if (!body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }
  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.status(200).json({ user: user.toAuthJSON() });
      }
      return res.status(400).json(info);
    }
  )(req, res, next);
};



// Get current user info

const getCurrent = (req, res, next) => {
  const { payload } = req;

  return Users.findById(payload.id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }
    // return res.json(payload);
    return res.json({ user: user.toAuthJSON() });
  });
};

module.exports = {
  getAll: getAll,
  register: register,
  login: login,
  getCurrent: getCurrent
};
