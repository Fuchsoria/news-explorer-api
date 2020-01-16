const usersRouter = require('express').Router();
const { getMyUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users/me', auth, getMyUser);

module.exports = usersRouter;
