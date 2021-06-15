const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});

module.exports = (req, res) => {
  const sql = `SELECT * FROM customerdetials`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.json({ result });
  });
};
