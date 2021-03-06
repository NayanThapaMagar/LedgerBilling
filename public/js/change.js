//changing login information//changing login password
const changeloginInfo = (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById("oldPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
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
          alert(`${data.message}`)
        } else {
          //login successful
          console.log("Password changed");
          alert(`${data.message}`)
          window.location.assign("/secured/home");
        }
      });
  };