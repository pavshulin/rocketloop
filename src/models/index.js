const path = require('path');
const fs = require('fs');

const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const basename = path.basename(__filename);
const db = {
  models: {}
};

fs
  .readdirSync(__dirname)
  .filter(file => (file
    .indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    //const model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db.models[model.name] = model;
  });

Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
