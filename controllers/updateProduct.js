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
  const { stockQty, productID } = req.body;
  var oldStock;
  var upadtedStock = 0;
  const sql0 = `select productStock from productdetails WHERE productId = '${productID}'`;
  db.query(sql0, (err, result) => {
    if (err) throw err;
    const oldStock0 = result[0];
    oldStock = oldStock0.productStock;
  });
  // delaying code to get oldStock value
  setTimeout(function () {
    upadtedStock = parseFloat(oldStock) + parseFloat(stockQty);
    const sql = `UPDATE productdetails SET productStock='${upadtedStock}' WHERE productId='${productID}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.json({ success: true, message: "Stock Updated" });
    });
  }, 5);
};
