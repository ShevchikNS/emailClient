const service = require('../services/emaildb');
const crypto = require('../services/crypto');
const logger = require('../utils/logger');

module.exports = {
  showEmailAddPage: (req, res, next) => {
    res.render('email');
  },

  addEmail: async (req, res, next) => {
    const userId = req.user.id;

    const data = {
      email: req.body.email,
      password: crypto.encrypt(req.body.password),
    };
    try {
      const email = await service.addEmail(userId, data);
      res.send(email);
    } catch (error) {
      logger.error(error, ['controller', 'email', 'addEmail', `userId ${userId}`]);
    }
  },
};
