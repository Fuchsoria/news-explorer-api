const rateLimit = require('express-rate-limit');
const {
  limiterWindowMs,
  limiterMaxRequests,
} = require('../configuration/config');

const limiter = rateLimit({
  windowMs: limiterWindowMs, // 15 minutes
  max: limiterMaxRequests, // limit each IP to 100 requests per windowMs
});

module.exports = { limiter };
