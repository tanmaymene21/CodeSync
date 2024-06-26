require('dotenv').config();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: process.env.JWKS_CACHE === 'true',
    rateLimit: process.env.JWKS_RATE_LIMIT === 'true',
    jwksRequestsPerMinute: parseInt(process.env.JWKS_REQUESTS_PER_MINUTE, 10),
    jwksUri: process.env.JWKS_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ['RS256'],
});

module.exports = {
  checkJwt,
};
