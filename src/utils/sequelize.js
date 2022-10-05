const Sequelize = require('sequelize');
const config = require('config');

const { database, user, host, port, pool, password }
  = config.get('postgres');

console.log(database, 'DATABASE NAME')

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  pool,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;

