const bCrypt = require("bcrypt-nodejs");
const models = require("../models");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport, user) {
  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // deserialize user
  passport.deserializeUser(function(id, done) {
    models.User.findByPk(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        let generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        models.User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already exist"
            });
          } else {
            let userPassword = generateHash(password);
            let data = {
              email: email,
              password: userPassword
            };
            models.User.create(data).then(function(newUser, created) {
              if (newUser) {
                return done(null, newUser);
              }

              return done(null, false);
            });
          }
        });
      }
    )
  );
  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        let isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        models.User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }
            let userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};
