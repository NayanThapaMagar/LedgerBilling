const express = require("express");
const router = express.Router();

//import authenticating middleware
const verify = require("../auth/authenticate");

//use static folder to serve frontend files
const staticDir = __dirname.replace("routes", "public");
router.use(express.static(staticDir));

//use json
router.use(express.json({ limit: "1mb" }));

//use authentication middleware
router.use(verify);

//displaying costumer details
const dislpayCustomerDetails = require("../controllers/dislpayCustomerDetails");

// connecting to backend to display products 
const dislpayProductDetails = require("../controllers/dislpayProductDetails");

// changing login info
const changeloginInfo = require("../controllers/changeloginInfo");

// adding new customer's details
const addCustomerDetails = require("../controllers/addCustomerDetails");

//displaying desired customer's details on search
const dislpayCustomerDetailsOnSearch = require("../controllers/dislpayCustomerDetailsOnSearch");

// connecting to backend to displaying product detials
const dislpayProductDetailsOnSearch = require("../controllers/dislpayProductDetailsOnSearch");

// to add products
const addProduct = require("../controllers/addProduct");

//logging out
const logout = require("../controllers/logout");

// directing to home page after authentication
router.get("/home", (req, res) => {
  res.sendFile(staticDir + "/home.html");
});
//redirecting to change password page
router.get("/redirectToChangePassword", (req, res) => {
  res.sendFile(staticDir + "/changeLoginInfo.html");
});
//securely redirecting to accounts
router.get("/account", (req, res) => {
  res.sendFile(staticDir + "/account.html");
});
//invoice display securely
router.get("/invoice", (req, res) => {
  res.sendFile(staticDir + "/invoice.html");
});
//addproduct display securely
router.get("/addProduct", (req, res) => {
  res.sendFile(staticDir + "/addProduct.html");
});
// changing login info
router.post("/changeloginInfo", changeloginInfo);

// adding new customer's details
router.post("/addCustomerDetails", addCustomerDetails);

//displaying costumer details
router.get("/dislpayCustomerDetails", dislpayCustomerDetails);

//displaying product names
router.get("/dislpayProductDetails", dislpayProductDetails);

// displaying desired customer's details on search
router.post("/dislpayCustomerDetailsOnSearch", dislpayCustomerDetailsOnSearch);

// displaying product detials on search
router.post("/dislpayProductDetailsOnSearch", dislpayProductDetailsOnSearch);

// adding product
router.post("/addProduct", addProduct);

// //logging out 
router.get("/logout", logout);

module.exports = router;
