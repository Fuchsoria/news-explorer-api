const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { corsCheck } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_PORT, DB } = require('./configuration/config');
const { limiter } = require('./modules/rateLimit');
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
app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(SERVER_PORT);
