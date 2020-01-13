const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

articlesRouter.get('/articles', getArticles);
articlesRouter.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  createArticle,
);
articlesRouter.delete('/articles/:articleId', deleteArticle);

module.exports = articlesRouter;
