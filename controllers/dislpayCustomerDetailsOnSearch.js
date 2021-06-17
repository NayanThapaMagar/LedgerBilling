const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "login",
  insecureAuth: true,
});
let count = 0;
module.exports = (req, res) => {
  const { searchCustomer, searchContact, searchAddress } = req.body;
  // all entered(name, address and contact)
  if (searchCustomer && searchAddress && searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerName = '${searchCustomer}' AND customerAddress = '${searchAddress}' AND customerContact = '${searchContact}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with customer name: '${searchCustomer}', address: '${searchAddress}'  and contact number: '${searchContact}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //name and address entered not contact
  if (searchCustomer && searchAddress && !searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerName = '${searchCustomer}' AND customerAddress = '${searchAddress}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with customer name: '${searchCustomer}'and address: '${searchAddress}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //name and contact entered not address
  if (searchCustomer && !searchAddress && searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerName = '${searchCustomer}' AND customerContact = '${searchContact}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with customer name: '${searchCustomer}' and contact number: '${searchContact}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //address and contact entered not name
  if (!searchCustomer && searchAddress && searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerAddress = '${searchAddress}' AND customerContact = '${searchContact}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with customer address: '${searchAddress}'  and contact number: '${searchContact}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only name entered
  if (searchCustomer && !searchAddress && !searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerName = '${searchCustomer}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with customer name: '${searchCustomer}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only address entered
  if (!searchCustomer && searchAddress && !searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerAddress = '${searchAddress}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with address: '${searchAddress}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
  //only contact entered
  if (!searchCustomer && !searchAddress && searchContact) {
    const sql = `SELECT * FROM customerdetails WHERE customerContact = '${searchContact}'`;
    db.query(sql, (err, result) => {
      if (result.length == 0) {
        return res.json({ success: false, message: `Costumer with contact number: '${searchContact}' doesn't exist!!!` });
      }
      return res.json({ success: true, result });
    });
  };
};

