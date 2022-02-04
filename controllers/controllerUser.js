require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');

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
    res.status(401).json({ message: 'Algo deu ruim' });
  }
};
