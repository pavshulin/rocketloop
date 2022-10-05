require('dotenv').config();
const config = require('config');

const { database, user, password, host, port } = config.get('postgres');

module.exports = {
  development: {
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
    dialect: 'postgres',
    username: user,
    database,
    password,
    host,
    port
  },
  production: {
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
    dialect: 'postgres',
    username: user,
    database,
    password,
    host,
    port
  }
};
