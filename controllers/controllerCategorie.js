require('dotenv').config();

const { Categorie } = require('../models');

const createCategorie = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });

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
