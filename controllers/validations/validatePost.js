require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { Categorie, BlogPost } = require('../../models');

const validateTitle = (req, res, next) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const validateContent = (req, res, next) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const validateCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  next();
};

const validateCategoryNotExists = async (req, res, next) => {
  const { categoryIds } = req.body;

  const category = await Categorie.findOne({ where: { id: categoryIds[0] } });

  if (category === null) return res.status(400).json({ message: '"categoryIds" not found' });
  next();
};

const validateBlogPostNotExists = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.findOne({ where: { id } });

  if (post === null) return res.status(404).json({ message: 'Post does not exist' });
  next();
};

const validateTokenNotFound = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  validateCategoryNotExists,
  validateBlogPostNotExists,
  validateTokenNotFound,
};
