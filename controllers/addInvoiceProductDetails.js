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
    //inserting selected product details of invoice to database inorder to display in personal account and ledger
    const { invoiceNo, customerId, productName, productID, productRate, productQty } = req.body;
    const sql = `INSERT INTO invoiceproductdetails (invoiceNo, customerId, productId, productName, productRate, prodcutQty) VALUES ('${invoiceNo}', '${customerId}', '${productID}', '${productName}', '${productRate}', '${productQty}');`;
    db.query(sql, (err, result) => {
    if (err) throw err;
        return res.json({ success: true, message: "Data Inserted" });
    });
};
