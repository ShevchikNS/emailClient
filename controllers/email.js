const logger = require('../utils/logger');
module.exports = {
  showEmailAddPage: (req, res, next) => {
    res.render('addEmail');
  },

  addEmail: (req, res, next) => {
    console.log(req.body);
    res.render('addEmail', { message: req.body.email });
  },
};
