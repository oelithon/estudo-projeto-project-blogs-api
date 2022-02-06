require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { requirementsValidation } = require('./validations/validateUser');

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
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

const getAllUsers = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    jwt.verify(authorization, secret);

    const usersList = await User.findAll();
    res.status(200).json(usersList);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    jwt.verify(authorization, secret);

    const userById = await User.findOne({ where: { id } });

    if (userById === null) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    res.status(200).json(userById);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
