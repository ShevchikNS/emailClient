

module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    'Contacts',
    {
      contactName: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Contacts.associate = function () {
    // associations can be defined here
  };
  return Contacts;
};
