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

//inserting customer info
const addCustomerDetials = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, contact }),
  };
  fetch("/insertCustomerInfo", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        console.log("Failed to insert data");
        console.log(`message: ${data.message}`);
      } else {
        //Data inserted
        console.log("Data inserted");
        alert("Data Inserted");
        window.location.assign("/secured/account");
      }
    });
};
// displaying customer info on load
let count = 0;
const tbody = document.getElementById("customer-detials");
const wrapCustomerDetails = (customer) => {
  count++;
  const row = document.createElement("tr");
  // row = <tr></tr>
  row.innerHTML = `
  <td class="sn">${count}</td>
  <td>${customer.customerName}</td>
  <td>${customer.customerId}</td>
  <td>${customer.customerContact}</td>
  <td>${customer.customerAddress}</td>`;
  tbody.appendChild(row);
};

const dislpayCustomerDetials = (e) => {
  e.preventDefault();
  // const searchContact = document.getElementById("contact").value;
  fetch("/secured/dislpayCustomerDetials")
    .then((res) => res.json())
    .then((data) =>
      data.result.forEach((customer) => wrapCustomerDetails(customer))
    );
};
// //displaying customer info on search
// const dislpayCustomerDetialsOnClick = (e) => {
//   e.preventDefault();
//   console.log("ON Click");
//   const searchContact = document.getElementById("searchContact").value;
//   // const address = document.getElementById("address").value;
//   // const contact = document.getElementById("contact").value;
//   console.log(searchContact);
// };
