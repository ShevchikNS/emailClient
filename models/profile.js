module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {},
  );
  Profile.associate = function () {
    // fdgdf
  };
  return Profile;
};
