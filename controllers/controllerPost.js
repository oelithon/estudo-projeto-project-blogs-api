require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { BlogPost, PostCategory, Categorie, User } = require('../models');

const createPost = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { categoryIds, title, content } = req.body;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const userId = jwt.verify(authorization, secret).username[0].id;

    const post = await BlogPost.create({ title, content, userId });
    const postId = post.id;
    const categoryPostIds = categoryIds.map(async (categoryId) => {
      PostCategory.create({ categoryId, postId });
    });

    await Promise.all(categoryPostIds);

    res.status(201).json({ id: postId, userId, title, content });
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    jwt.verify(authorization, secret);

    const blogPostList = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.status(200).json(blogPostList);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    jwt.verify(authorization, secret);

    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;

    const userId = jwt.verify(authorization, secret).username[0].id;
    const blogPost = await BlogPost.findByPk(id);

    if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
    if (userId !== blogPost.userId) res.status(401).json({ message: 'Unauthorized user' });

    await BlogPost.update({ title, content }, { where: { id } });

    const post = await BlogPost.findOne({
      attributes: { exclude: ['id', 'published', 'updated'] },
      where: { id },
      include: [{ model: Categorie, as: 'categories', through: { attributes: [] } }],
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
};
