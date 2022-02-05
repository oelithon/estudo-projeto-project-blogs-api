require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { requirementsValidation } = require('./validations/validateLogin');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ username: user }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    const { status, message } = requirementsValidation(error);
    res.status(status).json({ message });
  }
};
