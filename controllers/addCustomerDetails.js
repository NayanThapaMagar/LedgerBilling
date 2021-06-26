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
  const { name, address, contact } = req.body;
  if (contact > 9999999999 || contact < 9800000000 || isNaN(contact)){
    return res.json({ success: false, message: `Contact number: ${contact} is invalid` }); 
  }
  const sql = `SELECT * FROM customerdetails WHERE customerContact = '${contact}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      return res.json({ success: false, message: `Contact number: ${contact} is already occupied` });
    }
    const sql1 = `INSERT INTO customerdetails (customerName, customerAddress, customerContact) VALUES ('${name}', '${address}', '${contact}')`;
    db.query(sql1, (err, result) => {
      if (err) throw err;
        return res.json({ success: true, message: "Data Inserted" });
    });
  });
};
