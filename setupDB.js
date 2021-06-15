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
  "CREATE TABLE admin(id INT AUTO_INCREMENT, email varchar(255) NOT NULL UNIQUE, password TINYTEXT NOT NULL, name TINYTEXT, PRIMARY KEY(id));",
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

// //Create table
// app.get("/createlogintable", (req, res) => {
//   let sql =
//     "CREATE TABLE login(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Login table created");
//   });
// });

// //insert login details
// app.get("/addlogininfo", (req, res) => {
//   let admin = { name: "Saurav", email: "Sv@g.com" };
//   let sql = "INSERT INTO login SET ?";
//   let query = db.query(sql, admin, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Admin added");
//   });
// });

// //Select adminInfo
// app.get("/getlogininfo", (req, res) => {
//   let sql = "SELECT * FROM login";
//   let query = db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send("Admin Info fetched");
//   });
// });

// //Select desired adminInfo
// app.get("/getdesiredlogininfo/:id", (req, res) => {
//   let sql = `SELECT * FROM login WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Desired Admin Info fetched");
//   });
// });

// //update adminInfo
// app.get("/updatelogininfo/:id", (req, res) => {
//   let uname = "Dew";
//   let sql = `UPDATE login SET name = '${uname}' WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Name Updated");
//   });
// });

// //Delete adminInfo
// app.delete("/deletelogininfo/:id", (req, res) => {
//   let sql = `DELETE FROM login WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(`Admin Info deleted where id = ${req.params.id}`);
//   });
// });
// //creating costumer detials table
// CREATE TABLE customerdetials (
//   customerId INT AUTO_INCREMENT UNIQUE,
//    customerName TINYTEXT NOT NULL,
//    customerAddress VARCHAR(255),
//    customerContact VARCHAR(10) UNIQUE NOT NULL,
//    PRIMARY KEY(customerId)
//    );
//   INSERT INTO customerdetials (customerName, customerAddress, customerContact) VALUES ('Nayan', 'Pokhara', '9827168383');
