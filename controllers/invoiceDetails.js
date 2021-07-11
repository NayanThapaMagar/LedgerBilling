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
  const invoiceNo = req.body.invoiceNo;
  const sql1 = `SELECT * FROM invoicedetails WHERE customerId = ${id} AND invoiceNo = ${invoiceNo}`;
  db.query(sql1, (err, result1) => {
    if (err) throw err;
    const sql2 = `SELECT * FROM invoiceproductdetails WHERE customerId = ${id} AND invoiceNo = ${invoiceNo}`;
    db.query(sql2, (err, result2) => {
      if (err) throw err;
      return res.json({ success: true, result1, result2 });
    });
  });
};
