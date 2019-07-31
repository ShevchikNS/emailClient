

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      text: DataTypes.STRING,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      sendTime: DataTypes.DATE,
      emailID: DataTypes.INTEGER,
    },
    {},
  );
  Message.associate = function (models) {
    // associations can be defined here
  };
  return Message;
};
