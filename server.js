const express = require('express');

const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
// const env = require('dotenv');
const exphbs = require('express-handlebars');
const models = require('./models');
const config = require('./config/config.json');

const routes = require('./routes');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('./services/imap');
const logger = require('./utils/logger');

// For BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// For Passport
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
app.set('views', './views');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'layout',
  }),
);
app.set('view engine', '.hbs');

// load passport strategies
require('./lib/passport')(passport, models.user);

app.use('/', routes);

app.listen(config.server.port, (err) => {
  if (err) {
    logger.error(err, ['server error']);
  } else {
    logger.info('Site is live');
  }
});
