const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequest');
const {
  ARTICLE_NOT_FOUND,
  NOT_YOUR_ARTICLE,
} = require('../configuration/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({
      id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.source,
      image: article.image,
    }))
    .catch((e) => next(new BadRequestError(e.message)));
};

const deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;
  Article.findOne({ _id: articleId }).select('+owner')
    .orFail(() => {
      throw new NotFoundError(ARTICLE_NOT_FOUND);
    })
    .then((article) => {
      if (_id === String(article.owner)) {
        Article.findByIdAndDelete(articleId)
          .then((result) => res.status(200).send(result))
          .catch(next);
      } else {
        throw new ForbiddenError(NOT_YOUR_ARTICLE);
      }
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
