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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  let dailyTransaction;
  let mostSoldProducts;
  let lowStockProducts;
  let goodCustomerCandidate;

  const sql0 = `SELECT * FROM invoicedetails WHERE date = "${today}"`;
  db.query(sql0, (err, dailyTransaction0) => {
    if (err) throw err;
    dailyTransaction = dailyTransaction0;
  });
  const sql1 = `SELECT productName, COUNT(productId) AS value_occurrence FROM invoiceproductdetails GROUP BY productName ORDER BY value_occurrence DESC LIMIT 10`;
  db.query(sql1, (err, mostSoldProducts0) => {
    if (err) throw err;
    mostSoldProducts = mostSoldProducts0;
  });
  const sql2 = `select * from productdetails WHERE productStock < 10;`;
  db.query(sql2, (err, lowStockProducts0) => {
    if (err) throw err;
    lowStockProducts = lowStockProducts0;
  });
  const sql3 = `SELECT customerId FROM customerdetails WHERE dueBalance < 200000`;
  db.query(sql3, (err, goodCustomerId) => {
    if (err) throw err;
    goodCustomerId.forEach((goodCustomerId) => {
      const sql = `SELECT customerName, customerId, customerAddress, customerContact, SUM(total) AS totalExpense FROM invoicedetails WHERE customerId = '${goodCustomerId.customerId}'`;
      db.query(sql, (err, goodCustomerCandidate0) => {
        if (err) throw err;
        const goodCustomerCandidate1 = goodCustomerCandidate0[0];
        goodCustomerCandidate = {...goodCustomerCandidate, ...goodCustomerCandidate1 }
        // if (goodCustomerCandidate.totalExpense >= 1000000) {
        //   console.log(
        //     "--------------------------------------------------------------------------"
        //   );
        //   console.log(goodCustomerCandidate.customerName);
        //   console.log(goodCustomerCandidate.totalExpense);
        //   console.log(
        //     "--------------------------------------------------------------------------"
        //   );
        // }
      });
    });
    return res.json({
      success: true,
      goodCustomerCandidate,
      dailyTransaction,
      mostSoldProducts,
      lowStockProducts,
    });
  });
};
