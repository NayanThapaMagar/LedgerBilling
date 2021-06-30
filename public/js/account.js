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
        //failed to insert data
        alert(`${data.message}`)
      } else {
        //Data inserted
        alert("Data Inserted");
        window.location.assign("/secured/addAccount");
      }
    });
};


let count = 0;
//to display customer info
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
// displaying customer info on load
const dislpayCustomerDetails = (e) => {
  e.preventDefault();
  fetch("/secured/dislpayCustomerDetails")
    .then((res) => res.json())
    .then((data) =>
      data.result.forEach((customer) => wrapCustomerDetails(customer))
    );
};

//removing previous data before displaying new
const clearCustomerInfoTable = () => {
  while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
  }
};
  
  //displaying customer info on search
  const dislpayCustomerDetailsOnSearch = (e) => {
    e.preventDefault();
    count = 0;
    const searchCustomer = document.getElementById("searchCustomer").value;
    const searchContact = document.getElementById("searchContact").value;
    const searchAddress = document.getElementById("searchAddress").value;
    if ( searchCustomer === "" && searchContact === "" && searchAddress === "") {
      return alert("Enter atleast one parameter");
    } 
    clearCustomerInfoTable();
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchCustomer, searchContact, searchAddress }),
    };
    fetch("/secured/dislpayCustomerDetailsOnSearch", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        alert(`${data.message}`)
      } else {
        data.result.forEach((customer) => wrapCustomerDetails(customer))
      }
    }
    );
  };