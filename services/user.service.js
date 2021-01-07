const User = require('../models/User.model');

module.exports.isAuthenticated = () => null;

module.exports.findUserByEmail = email => User.findOne({ email });

module.exports.createUser = payload => User.create(payload);