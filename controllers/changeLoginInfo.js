// const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});

module.exports = (req, res) => {
//   console.log("here");
  const { oldPassword, newPassword, confirmPassword } = req.body;
//   console.log(oldPassword);
//   console.log(newPassword);
//   console.log(confirmPassword);
  const sql = `SELECT * FROM admin WHERE password = '${oldPassword}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length == 0) {
      //incorrect password
      return res.json({ success: false, message: "Incorrect password" });
    } else {
      //correct password
      // const admin = result[0];
      if(newPassword!=confirmPassword){
        return res.json({ success: false, message: "Password Doesn't match" });
      } else{
        const sql1 =`UPDATE admin SET password='${newPassword}' WHERE password='${oldPassword}'`;
        db.query(sql1, (err, result) => {
          if (err) throw err;
          else {
            return res.json({ success: true, message: "Password changed" });
          }
      });
      }
      }
  });
};
