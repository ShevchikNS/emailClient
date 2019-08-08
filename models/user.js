module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      profileId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );
  User.associate = function (models) {
    User.belongsToMany(models.Email, {
      through: 'EmailUser',
      as: 'email',
      foreignKey: 'userId',
    });
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',
    });
  };
  return User;
};
