const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { corsCheck } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB, limiter } = require('./configuration/config');
const { errorHandler } = require('./middlewares/errorHandler');

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

app.use(routes);

// Логирование ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(SERVER_PORT);
