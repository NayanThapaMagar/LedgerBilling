const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql");
const { get } = require("./routes/secured");
const path = require("path");

//Import Routes
const securedRoute = require("./routes/secured");

//import controller's login
const login = require("./controllers/login");

//import controller's change login info
const changeLoginInfo = require("./controllers/changeLoginInfo");


dotenv.config();

//Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});
db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

//use static folder to serve frontend
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));
app.use(express.json({ limit: "1mb" }));

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

//Route Middlewares
app.use("/secured", securedRoute);

app.post("/login", login);

app.post("/changeLoginInfo", changeLoginInfo);


const PORT = 5000;
app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
