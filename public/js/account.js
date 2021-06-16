//adding new customer info
const addCustomerDetails = (e) => {
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
    fetch("/secured/addCustomerDetails", fetchOptions)
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
  const tbody = document.getElementById("customer-details");
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
  
  const dislpayCustomerDetails = (e) => {
    e.preventDefault();
    fetch("/secured/dislpayCustomerDetails")
      .then((res) => res.json())
      .then((data) =>
        data.result.forEach((customer) => wrapCustomerDetails(customer))
      );
  };

  const clearCustomerInfoTable = () => {
    //keep on removing child untill there is first child
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
  };
  
  //displaying customer info on search
  const dislpayCustomerDetailsOnSearch = (e) => {
    e.preventDefault();
    clearCustomerInfoTable();
    count = 0;
    const searchContact = document.getElementById("searchContact").value;
    // console.log(searchContact);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchContact }),
    };
    fetch("/secured/dislpayCustomerDetailsOnSearch", fetchOptions)
    .then((res) => res.json())
    .then((data) =>
      data.result.forEach((customer) => wrapCustomerDetails(customer))
    );
  };