const login = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  fetch("/login", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        console.log("login failed");
        console.log(`message: ${data.message}`);
      } else {
        //login successful
        console.log("login successful");
        window.location.assign("/secured/home");
      }
    });
};


//redirecting to change password page
const redirectToChangePassword = (e) => {
  window.location.assign("/secured/redirectToChangePassword");
};

//changing login information
const changeloginInfo = (e) => {
  e.preventDefault();
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  // console.log(oldPassword);
  // console.log(newPassword);
  // console.log(confirmPassword);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
  };
  fetch("/changeLoginInfo", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        console.log("Failed to change password");
        console.log(`message: ${data.message}`);
      } else {
        //login successful
        console.log("Password changed");
        window.location.assign("/secured/home");
      }
    });
};


  

