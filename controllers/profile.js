const service = require('../services/profiledb');
const logger = require('../utils/logger');

module.exports = {
  showProfileAddPage: (req, res, next) => {
    res.render('profile');
  },

  addProfile: async (req, res, next) => {
    const data = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      userId: req.user.id,
    };
    try {
      const profile = await service.create(data);
      res.send(profile);
    } catch (error) {
      logger.error(error, ['controllers', 'profile', 'addProfile', `userId ${data.userId}`]);
    }
  },
};
