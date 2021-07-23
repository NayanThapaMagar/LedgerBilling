// const express = require("express");
// const logedin = express.logedin();

// //import authenticating middleware
// const verify = require("../auth/authenticate");

// //use authentication middleware
// // logedin.use(verify);

// // directing to home page after authentication
// router.get("/verify/home", (req, res) => {
//   res.sendFile(staticDir + "/home.html");
// });

// const isLogedIn = () => {
//   fetch("../../auth/authenticate/")
//   .then((res) => res.json())
//   .then((data) => {
//     if (data.success) {
//       window.location.assign("/secured/home");
//     }
//   });
// }
// isLogedIn();

const addAdmin = (e) => {
    e.preventDefault();
    const companyname = document.getElementById("companyname").value.trim();
    const userName = document.getElementById("userName").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    if(password != confirmPassword ) {
        alert("Password doesn't match");
        return;
    }
const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ companyname, userName, address, email, contact, password })
  };
   fetch("/register", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        //Regestration Failed
        alert(`${data.message}`)
      } else {
        //Regestration successful
        alert(`${data.message}`)
        window.location.assign("/login")
      }
    });
};
