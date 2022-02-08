require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { BlogPost, PostCategory } = require('../models');

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
    res.status(401).json(error);
  }
};

module.exports = {
  createPost,
};
