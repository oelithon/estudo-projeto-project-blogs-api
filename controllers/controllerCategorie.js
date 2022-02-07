require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { Categorie } = require('../models');

const createCategorie = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(authorization, secret);

    await Categorie.create({ name });

    const categorie = await Categorie.findOne({ where: { name } });
    res.status(201).json(categorie);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    jwt.verify(authorization, secret);

    const categorieList = await Categorie.findAll();
    res.status(200).json(categorieList);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createCategorie,
  getAllCategories,
};
