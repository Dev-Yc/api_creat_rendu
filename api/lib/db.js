const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.authenticate().then(() => {
  console.log("Connection to PG has been established successfully.");
});

module.exports = sequelize;
