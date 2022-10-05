module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('storages', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      capacity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      does_refrigeration: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      // Timestamps
      created_at: {
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE
      }
    });
  },

  down: async (queryInterface) => {
    queryInterface.dropTable('storages', {});
  }
};
