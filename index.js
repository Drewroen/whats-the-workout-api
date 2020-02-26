// Initial requirements
const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Starts database connection
const mongooseConnection = require('./utils/mongoose')
mongooseConnection.connectToDatabase();

// Loads models
require('./models/workout');

// Loads controllers
app.use(require('./controllers'));

// Starts locally
app.listen(3000, () => console.log(`Listening on: 3000`));

// Used for serverless application
module.exports.handler = serverless(app);