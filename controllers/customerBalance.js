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
  const { customerId } = req.body;
  const sql = ` SELECT 
  SUM((total+(0.13*total)-(0.05*(total+(0.13*total))))-paidAmount) as balance
  FROM
  invoicedetails where customerId = '${customerId}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const balance0 = result[0];
    const balance = Object.values(JSON.parse(JSON.stringify(balance0)));
    const sql1 = `UPDATE customerdetails SET total='${balance}' WHERE CustomerID='${customerId}'`;
    db.query(sql1, (err, result) => {
      if (err) throw err;
        return res.json({ success: true, message: "Data Inserted", result });
    });
  });
};


