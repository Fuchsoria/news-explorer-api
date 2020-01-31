const signRouter = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { signinRequestCheck, signupRequestCheck } = require('../modules/validations');

signRouter.post('/signin', signinRequestCheck, login);
signRouter.post('/signup', signupRequestCheck, createUser);
signRouter.post('/logout', logout);

module.exports = signRouter;
