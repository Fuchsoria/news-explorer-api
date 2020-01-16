const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const signRouter = require('./sign');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND } = require('../configuration/constants');

router.use(signRouter);
router.use(usersRouter);
router.use(articlesRouter);

router.use((req, res, next) => next(new NotFoundError(NOT_FOUND)));

module.exports = router;
