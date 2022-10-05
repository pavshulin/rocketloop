const config = require('config');
const { Op, QueryTypes, fn } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ItemType = sequelize.define('ItemType', {

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
    needsRefrigeration: {
      field: 'needs_refrigeration',
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'item_types'
  });

  ItemType.SEARCH_FIELDS = [
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

  ItemType.associate = (models) => {
    ItemType.hasMany(models.Item, {
      sourceKey: "id",
      foreignKey: "typeId"
    });
  };

  ItemType.createOne = async function ({
    name,
    needsRefrigeration
  }) {

    return ItemType.create({
      name,
      needsRefrigeration
    });
  }

  ItemType.findByName = async function (
    name
  ) {
    return ItemType.findOne({
      where: {
        name
      }
    });
  }

  return ItemType;
};
