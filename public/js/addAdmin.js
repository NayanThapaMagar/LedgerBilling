const addAdmin = (e) => {
    e.preventDefault();
    const companyname = document.getElementById("companyname").value;
    const userName = document.getElementById("userName").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
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
