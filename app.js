const express = require('express');
const bodyParser = require('body-parser');

const validatePost = require('./controllers/validations/validatePost');

const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');
const controllerCategorie = require('./controllers/controllerCategorie');
const controllerPost = require('./controllers/controllerPost');

const app = express();

app.use(bodyParser.json());

app
  .route('/user/:id')
  .get(controllerUser.getUserById);

app
  .route('/user')
  .post(controllerUser.createUser)
  .get(controllerUser.getAllUsers);

app
  .route('/login')
  .post(controllerLogin.loginUser);

app
  .route('/categories')
  .post(controllerCategorie.createCategorie)
  .get(controllerCategorie.getAllCategories);

app
  .route('/post/:id')
  .get(
    validatePost.validateBlogPostNotExists,
    controllerPost.getBlogPostById,
  ).put(controllerPost.updateBlogPost);

app
  .route('/post')
  .post(
    validatePost.validateTitle,
    validatePost.validateContent,
    validatePost.validateCategoryIds,
    validatePost.validateCategoryNotExists,
    controllerPost.createPost,
  )
  .get(controllerPost.getAllBlogPosts);

module.exports = app;
