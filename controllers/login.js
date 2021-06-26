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
  const { userName, password } = req.body;
  const sql = `SELECT * FROM admin WHERE userName = '${userName}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length == 0) {
      //admin does not exist
      return res.json({ success: false, message: "Admin doesn't exist!!!" });
    } else {
      //admin exists
      const admin = result[0];
      if (password != admin.password) {
        //incorrect password
        return res.json({ success: false, message: "Incorrect Password!!!" });
      } else {
        //correct password
        // jwt.sign(info, secret, options)=>jwt.sign ko format
        const token = jwt.sign(
          {
            id: admin.id,
            companyName: admin.companyName,
            userName: admin.userName,
            address: admin.address,
            email: admin.email,
            contact: admin.contact
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("token", token);
        res.cookie("contact", admin.contact);
        return res.json({ success: true, message: "Login Successful", id: admin.id,
          companyName: admin.companyName,
          userName: admin.userName,
          address: admin.address,
          email: admin.email,
          contact: admin.contact 
        });
      }
    }
  });
};
