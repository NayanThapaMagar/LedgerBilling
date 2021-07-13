const mysql = require("mysql");
require("dotenv").config();

//Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});

const tables = [
  "CREATE TABLE admin (id INT AUTO_INCREMENT, companyName VARCHAR(50) NOT NULL, address VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL, contact VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL, userName VARCHAR(255) NOT NULL, PRIMARY KEY(id));",
  "CREATE TABLE customerdetails (customerId INT AUTO_INCREMENT UNIQUE, customerName TINYTEXT NOT NULL, customerAddress VARCHAR(255), customerContact VARCHAR(10) UNIQUE NOT NULL, total float, PRIMARY KEY(customerId));",
  "CREATE TABLE productdetails (productId INT AUTO_INCREMENT UNIQUE, productName TINYTEXT NOT NULL, productRate INT NOT NULL, productStock INT, PRIMARY KEY productId));",
  "CREATE TABLE invoicedetails (Id INT AUTO_INCREMENT UNIQUE, customerName TINYTEXT NOT NULL, customerId INT NOT NULL, customerAddress VARCHAR(255) NOT NULL, customerContact VARCHAR(10) NOT NULL, invoiceNo VARCHAR(255), date DATE NOT NULL, total FLOAT, paidAmount FLOAT NOT NULL, deliveredBy VARCHAR(255), checkedBy VARCHAR(255), cashBillNo VARCHAR(255), PRIMARY KEY(Id));",
  "CREATE TABLE invoiceproductdetails (Id INT AUTO_INCREMENT UNIQUE, invoiceNo INT NOT NULL, customerId INT NOT NULL, productId INT NOT NULL, productName TINYTEXT NOT NULL, productRate INT NOT NULL, prodcutQty INT NOT NULL, PRIMARY KEY(Id));",
];

tables.forEach((table) => {
  db.query(table, (err, result) => {
    if (err) throw err;
    console.log(`Table created`);
  });
});
// //create a database
// app.get("/createdb", (req, res) => {
//   const sql = "Create Database login";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     res.send("Database Created...");
//   });
// });

// //Create admin table
// app.get("/createadmintable", (req, res) => {
//   let sql =
//     "CREATE TABLE admin (
// id INT AUTO_INCREMENT, companyName VARCHAR(50) NOT NULL, address VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL,contact VARCHAR(20) NOT NULL, password VARCHAR(20) NOT NULL, userName VARCHAR(255) NOT NULL, PRIMARY KEY(id) )";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("admin table created");
//   });
// });


// //Select adminInfo
// app.get("/getAdmininfo", (req, res) => {
//   let sql = "SELECT * FROM admin";
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send("Admin Info fetched");
//   });
// });

// //Select desired adminInfo
// app.get("/getdesiredAdmininfo/:id", (req, res) => {
//   let sql = `SELECT * FROM admin WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Desired Admin Info fetched");
//   });
// });

// //update adminInfo
// app.get("/updateAdmininfo/:id", (req, res) => {
//   let uname = "Dew";
//   let sql = `UPDATE admin SET nameeee = '${uname}' WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Name Updated");
//   });
// });

// //Delete adminInfo
// app.delete("/deleteAdmininfo/:id", (req, res) => {
//   let sql = `DELETE FROM admin WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(`Admin Info deleted where id = ${req.params.id}`);
//   });
// });

// //creating costumer detials table
// CREATE TABLE customerdetails (
//   customerId INT AUTO_INCREMENT UNIQUE,
//    customerName TINYTEXT NOT NULL,
//    customerAddress VARCHAR(255),
//    customerContact VARCHAR(10) UNIQUE NOT NULL,
//    PRIMARY KEY(customerId)
//    );
//create table admin (id int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(20), name VARCHAR(255), PRIMARY KEY(id))
//   INSERT INTO customerdetails (customerName, customerAddress, customerContact) VALUES ('Nayan', 'Pokhara', '9827168383');
// insert into admin (email, password, name) values (" ", " ", " ");
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';
//-------------------------------------------Create the database and these tables--------------------------------------//
// CREATE TABLE admin (
//   id INT AUTO_INCREMENT,
//   companyName VARCHAR(50) NOT NULL,
//   address VARCHAR(50) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   contact VARCHAR(20) NOT NULL,
//   password VARCHAR(20) NOT NULL, 
//   userName VARCHAR(255) NOT NULL,
//   PRIMARY KEY(id)
//    );
// CREATE TABLE customerdetails (
//   customerId INT AUTO_INCREMENT UNIQUE,
//    customerName TINYTEXT NOT NULL,
//    customerAddress VARCHAR(255),
//    customerContact VARCHAR(10) UNIQUE NOT NULL,
//    total float,
//    PRIMARY KEY(customerId)
//    );
// CREATE TABLE productdetails (
//   productId INT AUTO_INCREMENT UNIQUE,
//   productName TINYTEXT NOT NULL,
//   productRate INT NOT NULL,
//   productStock INT,
//   PRIMARY KEY(productId)
//    );
//   CREATE TABLE invoicedetails (
//   Id INT AUTO_INCREMENT UNIQUE,
//   customerName TINYTEXT NOT NULL,
//   customerId INT NOT NULL,
//   customerAddress VARCHAR(255) NOT NULL,
//   customerContact VARCHAR(10) NOT NULL,
//   invoiceNo VARCHAR(255),
//   date DATE NOT NULL,
//   total FLOAT,
//   paidAmount FLOAT NOT NULL,
//   deliveredBy VARCHAR(255),
//   checkedBy VARCHAR(255),
//   cashBillNo VARCHAR(255),
//   PRIMARY KEY(Id)
//    );
//    CREATE TABLE invoiceproductdetails (
//   Id INT AUTO_INCREMENT UNIQUE,
//   invoiceNo INT NOT NULL,
//   customerId INT NOT NULL,
//   productId INT NOT NULL,
//   productName TINYTEXT NOT NULL,
//   productRate INT NOT NULL,
//   prodcutQty INT NOT NULL,
//   PRIMARY KEY(Id)
//    );