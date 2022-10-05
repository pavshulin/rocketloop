module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_types', {
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
      needs_refrigeration: {
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
    await queryInterface.dropTable('item_types');
  }
};
