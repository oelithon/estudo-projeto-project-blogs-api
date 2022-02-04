const express = require('express');
const bodyParser = require('body-parser');

const controllerUser = require('./controllers/controllerUser');

const app = express();

app.use(bodyParser.json());

app
  .route('/user')
  .post(controllerUser);

module.exports = app;
