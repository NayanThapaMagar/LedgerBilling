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
    //inserting invoice details to database inorder to display in personal account and ledger
    const { invoiceNo, date, customerName, customerId, customerAddress, contactNo, total, paidAmount, deliveredBy, checkedBy } = req.body;
    const sql = `INSERT INTO invoicedetails (customerName, customerId, customerAddress, customerContact, invoiceNo, date, total, paidAmount, deliveredBy, checkedBy) VALUES ('${customerName}', '${customerId}', '${customerAddress}', '${contactNo}', '${invoiceNo}', '${date}', '${total}', '${paidAmount}', '${deliveredBy}', '${checkedBy}');`;
    db.query(sql, (err, result) => {
    if (err) throw err;
        return res.json({ success: true, message: "Data Inserted" });
    });
};
