module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      profileId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      freezeTableName: true,
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
