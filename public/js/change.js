//changing login information
const changeloginInfo = (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    };
    fetch("/secured/changeLoginInfo", fetchOptions)
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