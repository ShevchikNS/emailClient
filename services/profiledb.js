const models = require('../models');

module.exports = {
  create: async (profileData) => {
    const profile = await models.Profile.create(profileData);
    return profile;
  },
};
