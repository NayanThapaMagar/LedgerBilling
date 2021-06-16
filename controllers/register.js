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
  const { companyname, userName, address, email, contact, password } = req.body;
  const sql = `SELECT * FROM admin`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    //Allowing access to a single admin by testing if database is empty or not
    if (result.length != 0) {
        return res.json({ success: false, message: 'Regristration Failed. Admin already exist!!!' });
    }
    //If there is no admin then only inserting new admin data
    const sql1 = `INSERT INTO admin (companyname, userName, address, email, contact, password) VALUES ('${companyname}', '${userName}', '${address}', '${email}', '${contact}', '${password}')`;
    db.query(sql1, (err, result) => {
        if (err) throw err;
        return res.json({ success: true, message: "Regestration Successful. Admin Created" });
    });
});
};
