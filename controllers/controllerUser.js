require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { requirementsValidation } = require('./validations/validateUser');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ username: user.displayName }, secret, jwtConfig);

    res.status(201).json({ token });
  } catch (error) {
    const { status, message } = requirementsValidation(error);
    res.status(status).json({ message });
  }
};
