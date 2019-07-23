

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FolderMessages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    folderId: {
      type: Sequelize.INTEGER,
    },
    messageId: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('FolderMessages'),
};
