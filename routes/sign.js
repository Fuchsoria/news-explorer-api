const signRouter = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signinRequestCheck, signupRequestCheck } = require('../modules/validations');

signRouter.post('/signin', signinRequestCheck, login);
signRouter.post('/signup', signupRequestCheck, createUser);

module.exports = signRouter;
