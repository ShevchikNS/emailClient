const models = require('../models');

module.exports = {
  addEmail: async (userId, emailData) => {
    const user = await models.User.findByPk(userId);
    const email = await models.Email.create(emailData);
    user.addEmail(email);
    return email;
  },
};
