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

router.get("/home", (req, res) => {
  console.log(res.locals.name);
  res.sendFile(staticDir + "/home.html");
});

module.exports = router;
