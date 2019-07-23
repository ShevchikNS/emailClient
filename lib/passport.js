const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const models = require('../models');

module.exports = (passport, user) => {
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
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        const generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        models.User.findOne({
          where: {
            email,
          },
        }).then((user) => {
          if (user) {
            return done(null, false, {
              message: 'That email is already exist',
            });
          }
          const userPassword = generateHash(password);
          const data = {
            email,
            password: userPassword,
          };
          models.User.create(data).then((newUser, created) => {
            if (newUser) {
              return done(null, newUser);
            }
            return done(null, false);
          });
        });
      },
    ),
  );
  // LOCAL SIGNIN
  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        console.log(email, password);

        const isValidPassword = function (userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        models.User.findOne({
          where: {
            email,
          },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: 'Email does not exist',
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
            console.log('Error:', err);
            return done(null, false, {
              message: 'Something went wrong with your Signin',
            });
          });
      },
    ),
  );
};
