const express = require('express');
const bodyParser = require('body-parser');

const controllerUser = require('./controllers/controllerUser');
const controllerLogin = require('./controllers/controllerLogin');

const app = express();

app.use(bodyParser.json());

app
  .route('/user')
  .post(controllerUser);

app
  .route('/login')
  .post(controllerLogin);

module.exports = app;
