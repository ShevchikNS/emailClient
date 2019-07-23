

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {},
  );
  Profile.associate = function (models) {
    // associations can be defined here
  };
  return Profile;
};
