const mysql = require("mysql");
require("dotenv").config();

//Create Connection
const db = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});

const table =
  "CREATE TABLE admin (id INT AUTO_INCREMENT, companyName VARCHAR(50) NOT NULL, address VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL, contact VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL, userName VARCHAR(255) NOT NULL, PRIMARY KEY(id)); CREATE TABLE customerdetails (customerId INT AUTO_INCREMENT UNIQUE, customerName TINYTEXT NOT NULL, customerAddress VARCHAR(255), customerContact VARCHAR(10) UNIQUE NOT NULL, dueBalance DECIMAL(30,20), PRIMARY KEY(customerId)); CREATE TABLE productdetails (productId INT AUTO_INCREMENT UNIQUE, productName TINYTEXT NOT NULL, productRate INT NOT NULL, productStock INT, PRIMARY KEY (productId)); CREATE TABLE invoicedetails (Id INT AUTO_INCREMENT UNIQUE, customerName TINYTEXT NOT NULL, customerId INT NOT NULL, customerAddress VARCHAR(255) NOT NULL, customerContact VARCHAR(10) NOT NULL, invoiceNo VARCHAR(255), date DATE NOT NULL, total DECIMAL(30,20), paidAmount DECIMAL(30,20) NOT NULL, deliveredBy VARCHAR(255), checkedBy VARCHAR(255), cashBillNo VARCHAR(255), PRIMARY KEY(Id)); CREATE TABLE invoiceproductdetails (Id INT AUTO_INCREMENT UNIQUE, invoiceNo INT NOT NULL, customerId INT NOT NULL, productId INT NOT NULL, productName TINYTEXT NOT NULL, productRate INT NOT NULL, prodcutQty INT NOT NULL, PRIMARY KEY(Id));";

db.query(table, (err, result) => {
  if (err) throw err;
  console.log(`Table created`);
});
