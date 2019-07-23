

module.exports = (sequelize, DataTypes) => {
  const ContactUser = sequelize.define(
    'ContactUser',
    {
      userId: DataTypes.INTEGER,
      contactId: DataTypes.INTEGER,
    },
    {},
  );
  ContactUser.associate = function (models) {
    // associations can be defined here
  };
  return ContactUser;
};
