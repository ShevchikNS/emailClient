const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const models = require('../models');
const logger = require('../utils/logger');

module.exports = (passport) => {
  // serialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // deserialize user
  passport.deserializeUser((id, done) => {
    models.User.findByPk(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async (req, username, password, done) => {
        const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
        try {
          const user = await models.User.findOne({
            where: {
              username,
            },
          });
          if (user) {
            return done(null, false, {
              message: 'That username is already exist',
            });
          }

          const userPassword = generateHash(password);
          const data = {
            username,
            password: userPassword,
          };
          const newUser = await models.User.create(data);
          if (newUser) {
            return done(null, newUser);
          }
        } catch (error) {
          logger.error(error, ['passport', 'local-signup', `username ${username}`]);
        }
        return done(null, false);
      },
    ),
  );
  // LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with username
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, username, password, done) => {
        // console.log(username, password);

        const isValidPassword = (userpass, pass) => bCrypt.compareSync(pass, userpass);
        models.User.findOne({
          where: {
            username,
          },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: 'username does not exist',
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: 'Incorrect password.',
              });
            }
            const userinfo = user.get();
            return done(null, userinfo);
          })
          .catch((err) => {
            logger.log('Error:', err);
            return done(null, false, {
              message: 'Something went wrong with your Signin',
            });
          });
      },
    ),
  );
};
