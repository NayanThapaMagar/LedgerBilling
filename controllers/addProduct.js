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
  const { name, rate, stockQty } = req.body;
  if (isNaN(rate) ){
    return res.json({ success: false, message: `Rate: ${rate} is invalid` }); 
  }
  if (isNaN(stockQty) ){
    return res.json({ success: false, message: `Stock Quantity: ${stockQty} is invalid` }); 
  }
  const sql = `INSERT INTO productdetails (productName, productRate, productStock) VALUES ('${name}', '${rate}', '${stockQty}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
      return res.json({ success: true, message: "Data Inserted" });
  });
};
