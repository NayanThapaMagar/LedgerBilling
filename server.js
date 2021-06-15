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

//Route Middlewares
app.use("/secured", securedRoute);
//login process
app.post("/login", login);


const PORT = 5000;
app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
