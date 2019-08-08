const logger = require('../utils/logger');

const isLoggedIn = (req, res, next) => {
  logger.info(req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/signin');
};

module.exports = {
  isLoggedIn,
};
