module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define(
    'Email',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Email.associate = function (models) {
    Email.belongsToMany(models.User, {
      through: 'EmailUser',
      as: 'user',
      foreignKey: 'emailId',
    });
  };
  return Email;
};
