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
  if (contact > 9999999999){
    return res.json({ success: false, message: `Contact number: ${contact} is invalid` }); 
  }
  const sql = `SELECT * FROM customerdetails`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      result.forEach((result)=>{
        if (contact == result.customerContact) {
          return res.json({ success: false, message: `Contact number: ${contact} is already occupied` });
        }
      });
    }
  });
  const sql1 = `INSERT INTO customerdetails (customerName, customerAddress, customerContact) VALUES ('${name}', '${address}', '${contact}')`;
  db.query(sql1, (err, result) => {
    if (err) throw err;
    else{
        return res.json({ success: true, message: "Data Inserted" });
    }
  });
};
