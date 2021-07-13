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

// changing login info
const changeloginInfo = require("../controllers/changeloginInfo");

//displaying costumer details
const dislpayCustomerDetails = require("../controllers/dislpayCustomerDetails");

// connecting to backend to display products 
const dislpayProductDetails = require("../controllers/dislpayProductDetails");

//displaying desired customer's details on search
const dislpayCustomerDetailsOnSearch = require("../controllers/dislpayCustomerDetailsOnSearch");

// connecting to backend to displaying product detials
const dislpayProductDetailsOnSearch = require("../controllers/dislpayProductDetailsOnSearch");

// connecting to backend to displaying invoice detials
const dislpayInvoiceDetailsOnSearch = require("../controllers/dislpayInvoiceDetailsOnSearch");

// to new customer's details
const addCustomerDetails = require("../controllers/addCustomerDetails");

// to add products
const addProduct = require("../controllers/addProduct");

// to delete Product
const deleteProduct = require("../controllers/deleteProduct");

// to delete Customer
const deleteCustomer = require("../controllers/deleteCustomer");

// to updateProduct
const updateProduct = require("../controllers/updateProduct");

// to add selected product detials of invoice to database 
const addInvoiceProductDetails = require("../controllers/addInvoiceProductDetails");

// to display personal Account Details 
const personalAccountDetails = require("../controllers/personalAccountDetails");

// to display invoice Details 
const invoiceDetails = require("../controllers/invoiceDetails");

// to display cashBill Details 
const cashBillDetails = require("../controllers/cashBillDetails");

// to add detials of invoice to database 
const addInvoiceDetails = require("../controllers/addInvoiceDetails");

// to calculate and store customer balance amount 
const customerBalance = require("../controllers/customerBalance");



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
//securely redirecting to Add account
router.get("/addAccount", (req, res) => {
  res.sendFile(staticDir + "/addAccount.html");
});
//securely redirecting to delete Account
router.get("/deleteAccount", (req, res) => {
  res.sendFile(staticDir + "/deleteAccount.html");
});
//securely redirecting to search account
router.get("/searchAccount", (req, res) => {
  res.sendFile(staticDir + "/searchAccount.html");
});
//invoice display securely
router.get("/invoice", (req, res) => {
  res.sendFile(staticDir + "/invoice.html");
});
//ledger display securely
router.get("/ledger", (req, res) => {
  res.sendFile(staticDir + "/ledger.html");
});
//addproduct display securely
router.get("/addProduct", (req, res) => {
  res.sendFile(staticDir + "/addProduct.html");
});
//deleteProduct display securely
router.get("/deleteProduct", (req, res) => {
  res.sendFile(staticDir + "/deleteProduct.html");
});
//searchProduct display securely
router.get("/searchProduct", (req, res) => {
  res.sendFile(staticDir + "/searchProduct.html");
});
//addStock display securely
router.get("/addStock", (req, res) => {
  res.sendFile(staticDir + "/addStock.html");
});
// personal account display secuerly
router.get("/personal-account", (req, res) => {
  res.sendFile(staticDir + "/personalAccount.html");
});
// particular invoice details of particular person displaying secuerly
router.get("/invoice-details", (req, res) => {
  res.sendFile(staticDir + "/invoiceDetails.html");
});
// particular cashBill details of particulay person displaying secuerly
router.get("/cashBill-details", (req, res) => {
  res.sendFile(staticDir + "/cashBillDetails.html");
});
// cashBill display secuerlycashBill
router.get("/cashBill", (req, res) => {
  res.sendFile(staticDir + "/cashBill.html");
});


// changing login info
router.post("/changeloginInfo", changeloginInfo);

// adding new customer's details
router.post("/addCustomerDetails", addCustomerDetails);

//displaying costumer details
router.get("/dislpayCustomerDetails", dislpayCustomerDetails);

//displaying product names
router.get("/dislpayProductDetails", dislpayProductDetails);

// displaying personal account details on customer selected
router.post("/personalAccountDetails", personalAccountDetails);

// displaying invoice Details on invoice selected
router.post("/invoiceDetails", invoiceDetails);

// displaying cashBill Details on invoice selected
router.post("/cashBillDetails", cashBillDetails);

// displaying desired customer's details on search
router.post("/dislpayCustomerDetailsOnSearch", dislpayCustomerDetailsOnSearch);

// displaying product detials on search
router.post("/dislpayProductDetailsOnSearch", dislpayProductDetailsOnSearch);

// displaying invoice detials on search
router.post("/dislpayInvoiceDetailsOnSearch", dislpayInvoiceDetailsOnSearch);

// adding product
router.post("/addProduct", addProduct);

// deleting Product
router.post("/deleteProduct", deleteProduct);

// deleting Customer
router.post("/deleteCustomer", deleteCustomer);

// updateProduct
router.post("/updateProduct", updateProduct);

// adding selected product detials of invoice to database 
router.post("/addInvoiceProductDetails", addInvoiceProductDetails);

// adding detials of invoice to database 
router.post("/addInvoiceDetails", addInvoiceDetails);

// calculating and storing customer balance amount
router.post("/customerBalance", customerBalance);

// //logging out 
router.get("/logout", logout);

module.exports = router;
