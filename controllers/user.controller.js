const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.isAuthenticated = async function (req, res, next) {
  try {
    const verified = await jwt.verify(req.headers.token, 'secret');
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message, data: null, token: null, message: 'Something went wrong' });
  }
}

const comparePassword = (plainPassword, hashPassword) => new Promise((resolve, reject) => {
  bcrypt.compare(plainPassword, hashPassword, function (err, res) {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    };
  });
});

module.exports.login = async function (req, res, next) {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user) return res.status(200).json({ error: false, data: null, token: null, message: 'No account found with that email address.' });
    const matchPassword = await comparePassword(req.body.password, user.password);
    if (!matchPassword) return res.status(200).json({ error: false, data: null, token: null, message: 'Password didn\'t match' });
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;
    const token = await jwt.sign({ data: userObj }, 'secret', { expiresIn: '24hr' });
    return res.status(200).json({ error: false, data: null, token, message: 'Login Success!' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: true, data: null, token: null, message: 'Something went wrong' });
  }
}

const hashPassword = (password, saltRound) => new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          };
        });
      };
    });
  });

module.exports.register = async function (req, res, next) {
  try {
    const { body } = req;
    body.password = await hashPassword(body.password, 10);
    const user = await userService.createUser(body);
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;
    const token = await jwt.sign({ data: userObj }, 'secret', { expiresIn: '24hr' });
    return res.status(200).json({ error: false, data: null, token, message: 'Register successfully. please login...!' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: true, data: null, token: null, message: 'Something went wrong' });
  }
}