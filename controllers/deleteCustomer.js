const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});
module.exports = (req, res) => {
  const { customerContact } = req.body;
  const sql0 = `SELECT * FROM customerdetails WHERE customerContact = ${customerContact}`;
  db.query(sql0, (err, result0) => {
    if (err) throw err;
    customerId0 = result0[0];
    customerId = customerId0.customerId;
    const sql = `DELETE FROM customerdetails WHERE customerContact = ${customerContact}; DELETE FROM invoicedetails WHERE customerContact = ${customerContact}; DELETE FROM invoiceproductdetails WHERE customerId = ${customerId};`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.json({ success: true, result });
    });
  });
};
