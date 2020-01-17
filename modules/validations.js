const { celebrate, Joi } = require('celebrate');

const signinRequestCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const signupRequestCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(1),
    name: Joi.string().required().min(2).max(30),
  }),
});

const articleRequestCheck = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
});

module.exports = { signinRequestCheck, signupRequestCheck, articleRequestCheck };
