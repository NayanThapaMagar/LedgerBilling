//adding new customer info
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
    fetch("/secured/addCustomerDetials", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          console.log("Failed to insert data");
          console.log(`message: ${data.message}`);
        } else {
          //Data inserted
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
    fetch("/secured/dislpayCustomerDetials")
      .then((res) => res.json())
      .then((data) =>
        data.result.forEach((customer) => wrapCustomerDetails(customer))
      );
  };
  
  //displaying customer info on search
  const dislpayCustomerDetialsOnSearch = (e) => {
    e.preventDefault();
    const searchContact = document.getElementById("searchContact").value;
    // console.log(searchContact);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchContact }),
    };
    fetch("/secured/dislpayCustomerDetialsOnSearch", fetchOptions)
    .then((res) => res.json())
    .then((data) =>
      data.result.forEach((customer) => wrapCustomerDetails(customer))
    );
  };