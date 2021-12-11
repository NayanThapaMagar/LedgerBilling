const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql");
const { get } = require("./routes/secured");
const path = require("path");
const jwt = require("jsonwebtoken");

//Import Routes
const securedRoute = require("./routes/secured");

//import controller's login
const login = require("./controllers/login");

//inport controller's register
const register = require("./controllers/register");

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
// app.use(express.json({ limit: "100mb" }));

//App Entrance
app.get("/", (req, res) => {
  if (req.headers.cookie) {
    const cookieInfo = req.headers.cookie.split("; ");
    const user = {
      [cookieInfo[0].split("=")[0]]: cookieInfo[0].split("=")[1],
      [cookieInfo[1].split("=")[0]]: cookieInfo[1].split("=")[1],
    };
    if (user.token) {
      const decodedToken = jwt.verify(user.token, process.env.TOKEN_SECRET);
      if (decodedToken.contact === user.contact) {
        return res.redirect("/secured/home");
      }
    }
  }
  return res.sendFile(staticDir+"/login.html");
})


//Route Middlewares
app.use("/secured", securedRoute);
//login process
app.post("/login", login);
//regestering
app.post("/register", register);
//redirecting to login page
app.get("/login", (req, res) => {
  res.sendFile(staticDir+"/login.html");
});
//redirecting to register page
app.get("/register", (req, res) => {
  res.sendFile(staticDir+"/register.html");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
