const usersRouter = require('express').Router();

const { getMyUser } = require('../controllers/users');

usersRouter.get('/users/me', getMyUser);

module.exports = usersRouter;
