const login = (e) => {
  e.preventDefault();
  const userName = document.getElementById("userName").value.trim();
  const password = document.getElementById("password").value;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  };

  fetch("/login", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        //login failed
        alert(`${data.message}`)
      } else {
        //login successful
        localStorage.setItem("companyName", data.companyName);
        localStorage.setItem("address", data.address);
        localStorage.setItem("email", data.email);
        localStorage.setItem("contact", data.contact);
        localStorage.setItem("userName", data.userName);
        window.location.assign("/secured/home");
      }
    });
};





