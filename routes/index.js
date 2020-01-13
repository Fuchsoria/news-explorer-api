const router = require('express').Router();
const usersRouter = require('./users');
const articlesRouter = require('./articles');
// const NotFoundError = require('../errors/NotFoundError');

router.use(usersRouter);
router.use(articlesRouter);
// throw new NotFoundError('Запрашиваемый ресурс не найден'); ????
router.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

module.exports = router;
