const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { articleRequestCheck } = require('../modules/validations');

articlesRouter.get('/articles', getArticles);
articlesRouter.post(
  '/articles',
  articleRequestCheck,
  createArticle,
);
articlesRouter.delete('/articles/:articleId', deleteArticle);

module.exports = articlesRouter;
