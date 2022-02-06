require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { emailAndPasswordValidate } = require('./validations/validateLogin');

const secret = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const errors = emailAndPasswordValidate(email, password);

  if (errors) {
    return res.status(400).json({ message: errors.message });
  }
  const user = await User.findAll({ where: { email, password } });
  if (user.length < 1) return res.status(400).json({ message: 'Invalid fields' });

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ username: user }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  loginUser,
};
