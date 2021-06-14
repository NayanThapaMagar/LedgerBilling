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
