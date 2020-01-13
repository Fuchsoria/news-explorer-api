const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');

const {
  EMAIL_ALREADY_EXISTS,
} = require('../configuration/constants');
const { SECRET } = require('../configuration/config');

const createUser = async (req, res, next) => {
  const { email, password, name } = await req.body;
  const notUnique = await User.findOne({ email }).lean();

  if (await notUnique) {
    next(new ConflictError(EMAIL_ALREADY_EXISTS));
  } else {
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then((user) => res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      }))
      .catch((e) => next(new BadRequestError(e.message)));
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильная почта или пароль');
        }
        const token = jwt.sign({ _id: user._id }, SECRET, {
          expiresIn: '7d',
        });
        return res
          .status(200)
          .cookie('jwt', token, {
            maxAge: 25200000,
            httpOnly: true,
            sameSite: true,
          })
          .end();
      });
    })
    .catch(next);
};

const getMyUser = (req, res, next) => {
  User.findOne(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getMyUser,
};
