const config = require('config');
const moment = require('moment');
const { Op, QueryTypes, fn } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      field: 'expires_at',
      allowNull: false
    },
    typeId: {
      field: 'type_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item_types',
        key: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    },
    storageId: {
      field: 'storage_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'storages',
        key: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    }
  }, {
    underscored: true,
    tableName: 'items'
  });

  Item.SEARCH_FIELDS = [
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

  Item.associate = (models) => {
    Item.belongsTo(models.ItemType, {
      foreignKey: 'typeId',
      as: 'type'
    });
    Item.belongsTo(models.Storage, {
      foreignKey: 'storageId',
      as: 'storage'
    });
  };

  Item.createOne = async function ({
    storageId,
    expiresAt,
    typeId
  }) {
    if (moment(expiresAt).isBefore(moment())) {
      throw new Error('SHOULD BE IN FUTURE')
    }

    return Item.create({
      storageId,
      expiresAt,
      typeId
    });
  }

  return Item;
};
