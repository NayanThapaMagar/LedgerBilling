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
  const { productName, productId, productRate } = req.body;
  // all entered(name, product Id and product rate)
  if (productName && productId && productRate) {
    // productName, productRate, prodcutStock
    const sql = `SELECT * FROM productdetails WHERE productName = '${productName}' AND productId = '${productId}' AND productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${productName}', product Id: '${productId}'  and product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //name and product Id entered not product rate
  if (productName && productId && !productRate) {
    const sql = `SELECT * FROM productdetails WHERE productName = '${productName}' AND productId = '${productId}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${productName}'and product Id: '${productId}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //name and product rate entered not product Id
  if (productName && !productId && productRate) {
    const sql = `SELECT * FROM productdetails WHERE productName = '${productName}' AND productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${productName}' and product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //product Id and product rate entered not name
  if (!productName && productId && productRate) {
    const sql = `SELECT * FROM productdetails WHERE productId = '${productId}' AND productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product Id: '${productId}'  and product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only name entered
  if (productName && !productId && !productRate) {
    const sql = `SELECT * FROM productdetails WHERE productName = '${productName}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${productName}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only product Id entered
  if (!productName && productId && !productRate) {
    const sql = `SELECT * FROM productdetails WHERE productId = '${productId}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product Id: '${productId}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only product rate entered
  if (!productName && !productId && productRate) {
    const sql = `SELECT * FROM productdetails WHERE productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
};

