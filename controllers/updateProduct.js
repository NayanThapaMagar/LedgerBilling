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
  const { qty, productID, status } = req.body;
  const productLength = qty.length;
  // when variable is passed in qty and productID(adding stock from add stock)
  if (status == "add") {
    var oldStock;
    var upadtedStock;
    const sql0 = `select productStock from productdetails WHERE productId = '${productID}'`;
    db.query(sql0, (err, result) => {
      if (err) throw err;
      const oldStock0 = result[0];
      oldStock = oldStock0.productStock;
    });
    setTimeout(function () {
      upadtedStock = parseFloat(oldStock) + parseFloat(qty);
      const sql = `UPDATE productdetails SET productStock='${upadtedStock}' WHERE productId='${productID}'`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        return res.json({ success: true, message: "Stock Updated" });
      });
    }, 50);
  }
  //-------------------------when array is passed in qty and productID(updating stock value immediately after products are purchased)-----------------------------//
  // getting value of old stock
  if (status == "subtract") {
    const OLDStock = [];
    const UPDATEDStock = [];
    let i = 1;
    function myLoop() {
      setTimeout(function () {
        const sql0 = `select productStock from productdetails WHERE productId = '${productID[i]}'`;
        db.query(sql0, (err, result) => {
          if (err) throw err;
          let oldStock0 = result[0];
          OLDStock[i - 1] = oldStock0.productStock;
        });
        i++;
        if (i < productLength) {
          myLoop();
        }
      }, 100);
    }
    myLoop();
    //preparing query to update stock value
    let Query = "";
    setTimeout(function () {
      for (i = 1; i < productLength; i++) {
        UPDATEDStock[i] = parseFloat(OLDStock[i]) - parseFloat(qty[i]);
        Query = `UPDATE productdetails SET productStock='${UPDATEDStock[i]}' WHERE productId='${productID[i]}'; ` + Query;
      }
    }, 910);
    // updating stock
    setTimeout(function () {
      const sql = Query;
      db.query(sql, (err, result) => {
        if (err) throw err;
        return res.json({ success: true, message: "Stock Updated" });
      });
    }, 920);
  }
};
