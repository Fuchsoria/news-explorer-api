const rateLimit = require('express-rate-limit');
require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, DB_LINK, PORT,
} = process.env;

const devSecret = 'dev-secret';
const devDbLink = 'mongodb://localhost:27017/newsdb';
const devServerPort = 3000;

const allowedDomains = ['http://localhost:8080', 'https://fuchsoria.github.io', 'http://news-explorer.info', 'https://news-explorer.info'];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : devSecret;
const DB = NODE_ENV === 'production' && DB_LINK ? DB_LINK : devDbLink;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : devServerPort;

module.exports = {
  allowedDomains,
  limiter,
  SECRET,
  DB,
  SERVER_PORT,
};
