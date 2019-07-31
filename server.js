const express = require('express');

const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
// const env = require('dotenv');
const exphbs = require('express-handlebars');
const models = require('./models');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// require('./services/imap');
const logger = require('./utils/logger');

// For BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

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
app.use('/dashboard', (request, response) => {
  // to routes

  response.render('dashboard.hbs', {
    title: 'My account',
    username: request.user.username,
  });

  app.get('/', (req, res) => {
    res.send('Welcome to Passport with Sequelize');
  });
});

// Routes
require('./routes/auth.js')(app, passport);
app.use(require('./routes/getEmail'));
// load passport strategies
require('./lib/passport')(passport, models.user);

app.listen(5000, (err) => {
  if (err) {
    logger.error(err, ['server error']);
  } else {
    logger.info('Site is live');
  }
});
