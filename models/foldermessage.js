"use strict";
module.exports = (sequelize, DataTypes) => {
  const FolderMessage = sequelize.define(
    "FolderMessage",
    {
      folderId: DataTypes.INTEGER,
      messageId: DataTypes.INTEGER
    },
    {}
  );
  FolderMessage.associate = function(models) {
    // associations can be defined here
  };
  return FolderMessage;
};
