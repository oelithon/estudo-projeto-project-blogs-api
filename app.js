const express = require('express');
const bodyParser = require('body-parser');

const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');

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

module.exports = app;
