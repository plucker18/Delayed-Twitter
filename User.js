const Sequelize = require('sequelize');
// const { db } = require('./authentication.js');

const db = new Sequelize(
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/delayed-twitter', {
    logging: false
  }
);

const User = db.define('user', {
  oauthID: Sequelize.INTEGER,
  name: Sequelize.STRING,
  created: Sequelize.DATE
})

module.exports = User;
