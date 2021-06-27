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
  const { product, productId, productRate } = req.body;
  // all entered(name, product Id and product rate)
  if (product && productId && productRate) {
    // productName, productRate, prodcutStock
    const sql = `SELECT * FROM productdetails WHERE productName = '${product}' AND productId = '${productId}' AND productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${product}', product Id: '${productId}'  and product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //name and product Id entered not product rate
  if (product && productId && !productRate) {
    const sql = `SELECT * FROM productdetails WHERE productName = '${product}' AND productId = '${productId}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${product}'and product Id: '${productId}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //name and product rate entered not product Id
  if (product && !productId && productRate) {
    const sql = `SELECT * FROM productdetails WHERE productName = '${product}' AND productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${product}' and product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //product Id and product rate entered not name
  if (!product && productId && productRate) {
    const sql = `SELECT * FROM productdetails WHERE productId = '${productId}' AND productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product Id: '${productId}'  and product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only name entered
  if (product && !productId && !productRate) {
    const sql = `SELECT * FROM productdetails WHERE productName = '${product}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product name: '${product}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only product Id entered
  if (!product && productId && !productRate) {
    const sql = `SELECT * FROM productdetails WHERE productId = '${productId}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product Id: '${productId}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only product rate entered
  if (!product && !productId && productRate) {
    const sql = `SELECT * FROM productdetails WHERE productRate = '${productRate}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Product with product rate: '${productRate}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
};

