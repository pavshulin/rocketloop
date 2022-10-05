const config = require('config');
const { Op, QueryTypes, fn } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define('Storage', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doesRefrigeration: {
      field: 'does_refrigeration',
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    underscored: true,
    tableName: 'storages'
  });

  Storage.SEARCH_FIELDS = [
    'name'
  ]
  /**
   *
   * Static methods
   */

  /**
   *
   * @param models
   * @returns {Promise}
   */

  Storage.associate = (models) => {
    Storage.hasMany(models.Item, {
      sourceKey: "id",
      foreignKey: "storageId"
    });
  };

  Storage.createOne = async function ({ name, capacity, doesRefrigeration }) {
    return Storage.create({
      name,
      capacity,
      doesRefrigeration
    });
  }

  Storage.findByName = async function (
    name
  ) {
    return Storage.findOne({
      where: {
        name
      }
    });
  }

  return Storage;
};
