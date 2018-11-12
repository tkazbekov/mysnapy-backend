const mongoose = require('mongoose');

const SocialNetwork = mongoose.model('SocialNetwork');

const getAll = (req, res, next) => {
  return SocialNetwork.find({}).then(networks => res.json(200, networks));
};

const create = (req, res, next) => {
  const { body } = req;

  const network = new SocialNetwork(body);

  network.save().then(network => res.json(network));
};

module.exports = {
  getAll: getAll,
  create: create
};
