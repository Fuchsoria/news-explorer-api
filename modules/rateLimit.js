const rateLimit = require('express-rate-limit');
const {
  limiterWindowMs,
  limiterMaxRequests,
} = require('../configuration/config');

const limiter = rateLimit({
  windowMs: limiterWindowMs,
  max: limiterMaxRequests,
});

module.exports = { limiter };
