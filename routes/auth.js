const authController = require('../controllers/authcontroller.js');
const logger = require('../utils/logger');

module.exports = (app, passport) => {
  app.get('/signup', authController.signup);
  app.get('/signin', authController.signin);
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup',
    }),
  );
  function isLoggedIn(req, res, next) {
    logger.info(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/signin');
  }
  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);
  app.post(
    '/signin',
    passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/signin',
    }),
  );


};
