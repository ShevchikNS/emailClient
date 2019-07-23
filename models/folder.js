

module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define(
    'Folder',
    {
      letterGroup: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Folder.associate = function (models) {
    // associations can be defined here
  };
  return Folder;
};
