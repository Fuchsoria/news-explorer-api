const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { articleRequestCheck } = require('../modules/validations');
const auth = require('../middlewares/auth');

articlesRouter.get('/articles', auth, getArticles);
articlesRouter.post(
  '/articles',
  auth, articleRequestCheck,
  createArticle,
);
articlesRouter.delete('/articles/:articleId', auth, deleteArticle);

module.exports = articlesRouter;
