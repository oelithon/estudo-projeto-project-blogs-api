require('dotenv').config();

const { Categorie } = require('../models');

const createCategorie = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    await Categorie.create({ name });

    const categorie = await Categorie.findOne({ where: { name } });
    res.status(201).json(categorie);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  createCategorie,
};
