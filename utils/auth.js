const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

var auth = jwt({
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

module.exports = auth;