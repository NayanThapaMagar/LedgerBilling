const jwt = require("jsonwebtoken");
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
  console.log("here");
  const { email, password } = req.body;
  const sql = `SELECT * FROM admin WHERE email = '${email}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length == 0) {
      //admin does not exist
      return res.json({ success: false, message: "No admin found" });
    } else {
      //admin exists
      const admin = result[0];
      if (password != admin.password) {
        //incorrect password
        return res.json({ success: false, message: "Incorrect Password" });
      } else {
        //correct password
        // jwt.sign(info, secret, options)
        const token = jwt.sign(
          {
            id: admin.id,
            name: admin.name,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("token", token);
        res.cookie("name", admin.name);
        return res.json({ success: true, message: "Login Successful" });
      }
    }
  });
};
