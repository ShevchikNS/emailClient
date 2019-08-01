const service = require('../services/profiledb');

module.exports = {
  showProfileAddPage: (req, res, next) => {
    res.render('addProfile');
  },

  addProfile: async (req, res, next) => {
    // const userId = req.user.id;
    console.log(req.body);
    
    const data = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      userId: req.user.id,
    };
    const profile = await service.create(data);

    res.send(profile);
  },
};
