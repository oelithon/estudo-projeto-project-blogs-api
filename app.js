const express = require('express');
const bodyParser = require('body-parser');

const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');
const controllerCategorie = require('./controllers/controllerCategorie');

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
  .post(controllerCategorie.createCategorie);

module.exports = app;
