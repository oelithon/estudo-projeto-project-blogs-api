require('dotenv').config();

const { Post } = require('../models');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  await Post.create({ title, content });

  res.status(201).json({ message: 'Deu certo' });
};

module.exports = {
  createPost,
};
