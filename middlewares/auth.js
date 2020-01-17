const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SECRET } = require('../configuration/config');
const { UNAUTHORIZED } = require('../configuration/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (e) {
    next(new UnauthorizedError(UNAUTHORIZED));
  }

  req.user = payload;
  return next();
};
