require("dotenv").config();
var mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = connection;
