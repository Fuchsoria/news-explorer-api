require('dotenv').config();

const {
  NODE_ENV, JWT_SECRET, DB_LINK, PORT,
} = process.env;

const allowedDomains = ['http://localhost:8080', 'https://fuchsoria.github.io', 'http://news-explorer.info', 'https://news-explorer.info', 'http://test.news-explorer.info:8080', 'https://news-explorer.fuchsoria.dev', 'http://test.fuchsoria.dev'];

const devSecret = 'dev-secret';
const devDbLink = 'mongodb://localhost:27017/newsdb';
const devServerPort = 3000;

const limiterWindowMs = 15 * 60 * 1000;
const limiterMaxRequests = 100;

const SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : devSecret;
const DB = NODE_ENV === 'production' && DB_LINK ? DB_LINK : devDbLink;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : devServerPort;

const COOKIE_DOMAIN = '.fuchsoria.dev';

module.exports = {
  allowedDomains,
  limiterWindowMs,
  limiterMaxRequests,
  SECRET,
  DB,
  SERVER_PORT,
  COOKIE_DOMAIN,
};
