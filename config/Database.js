const { Sequelize } = require("sequelize");
require("dotenv").config();

// const db = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: "mysql",
//   }
// );
const db = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
});

module.exports = db;
