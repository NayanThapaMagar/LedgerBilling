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
