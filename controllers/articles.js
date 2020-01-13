const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    title, text, date, source, link, image,
  } = req.body;
  Article.create({
    title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  Article.findOne({ _id: articleId })
    .orFail(() => {
      throw new NotFoundError('Артикль не существует');
    })
    .then((article) => {
      if (_id === String(article.owner)) {
        Article.findByIdAndDelete(articleId)
          .then((result) => res.status(200).send(result))
          .catch(next);
      } else {
        throw new ForbiddenError('Вы можете удалять только свои артикли');
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
