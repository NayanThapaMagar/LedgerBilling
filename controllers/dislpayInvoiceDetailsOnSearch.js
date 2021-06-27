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
  const { invoiceId } = req.body;
  const sql = `SELECT * FROM invoicedetails WHERE customerId = "${invoiceId}";`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    let length = result.length;
    return res.json({ length, result });
    // return;
  });
};
