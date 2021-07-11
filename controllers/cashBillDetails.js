const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});

let count = 0;
module.exports = (req, res) => {
  const id = req.body.id;
  const cashBillNo = req.body.cashBillNo;
  const sql = `SELECT * FROM invoicedetails WHERE customerId = ${id} AND cashBillNo = ${cashBillNo}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    return res.json({ success: true, result });
  });
};
