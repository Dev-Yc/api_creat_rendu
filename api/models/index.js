const db = require("../lib/db");
const User = require("./User")(db);

module.exports = {
  db,
  User,
};
