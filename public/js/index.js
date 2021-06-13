const login = (e) => {
  e.preventDefault();
  const uname = document.getElementById("uname").value;
  const password = document.getElementById("password").value;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uname, password }),
  };

  fetch("/login", fetchOptions);
};
