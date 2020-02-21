const serverless = require('serverless-http');
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://drewroen.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://api.whatstheworkout.com',
  issuer: 'https://drewroen.auth0.com/',
  algorithms: ['RS256']
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/xping', function (req, res) {
  var pingResponse = {
    message: 'The service is healthy'
  }
  res.send(pingResponse)
});

app.get('/xping-auth', checkJwt, function (req, res) {
  var pingResponse = {
    message: 'The service is healthy. You are logged in'
  }
  res.send(pingResponse)
});

//app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);