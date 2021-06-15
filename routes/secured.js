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

//displaying costumer detials
const dislpayCustomerDetials = require("../controllers/dislpayCustomerDetials");

// directing to home page after authentication
router.get("/home", (req, res) => {
  res.sendFile(staticDir + "/home.html");
});
//redirecting to change password page
router.get("/redirectToChangePassword", (req, res) => {
  res.sendFile(staticDir + "/change.html");
});
//securely redirecting to accounts
router.get("/account", (req, res) => {
  res.sendFile(staticDir + "/account.html");
});

//displaying costumer detials
router.get("/dislpayCustomerDetials", dislpayCustomerDetials);

module.exports = router;
