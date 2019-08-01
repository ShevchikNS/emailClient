const logger = require('../utils/logger');
const service = require('../services/emaildb');

module.exports = {
  showEmailAddPage: (req, res, next) => {
    res.render('addEmail');
  },

  addEmail: async (req, res, next) => {
    const userId = req.user.id;
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    const email = await service.addEmail(userId, data);

    res.send(email);
  },
};
