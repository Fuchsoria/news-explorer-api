const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { login, createUser } = require('./controllers/users');
const { corsCheck } = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB, limiter } = require('./configuration/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { signinRequestCheck, signupRequestCheck } = require('./modules/validations');

require('dotenv').config();

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(corsCheck);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());

// Логирование запросов
app.use(requestLogger);

app.post('/signin', signinRequestCheck, login);
app.post('/signup', signupRequestCheck, createUser);

app.use('/', auth, routes);

// Логирование ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(SERVER_PORT);
