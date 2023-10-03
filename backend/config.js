const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // u otro dialecto, dependiendo de tu base de datos
  username: 'root',
  password: 'Gardel2615',
  host: 'localhost', // o la dirección de tu servidor de base de datos
  database: 'proyectoFinalDb',
});

module.exports = sequelize;

