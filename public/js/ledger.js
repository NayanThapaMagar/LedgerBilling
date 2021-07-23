//to display personal account
const tbody = document.getElementById("customer-transaction-details");
const personalAccount = (e, Id) => {
  e.preventDefault();
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: Id }),
  };
  fetch("/secured/personalAccountDetails", fetchOptions)
    .then((res) => res.json())
    .then((response) => {
      if (response.success) {
        // if transaction done
        window.location.assign(`/secured/personal-account?id=${Id}`);
      }
      if (!response.success) {
        //if 0 transactions
        alert("No transactions yet");
        window.location.assign("/secured/ledger");
      }
    });
};
let count = 0;
//to display customer info
const wrapCustomerDetails = (customer) => {
  count++;
  var blnc = parseFloat(customer.dueBalance);
  var balance0 = blnc;
  let balance = 0;
  let status = "check";
  // checking is customer balance is in credit or devit or no transaction
  if (balance0 < -0.0001) {
    status = "Dr";
    balance = -1 * balance0;
  } else if (balance0 > 0.0001) {
    status = "Cr";
    balance = 1 * balance0;
  } else {
    status = "Clear";
    balance = 0;
  }
  const row = document.createElement("tr");
  row.innerHTML = `
  <td class="sn">${count}</td>
  <td><button class="btn22" onclick="personalAccount(event,${
    customer.customerId
  })">${customer.customerName}</button></td>
  <td>${customer.customerId}</td>
  <td>${customer.customerContact}</td>
  <td>${customer.customerAddress}</td>
  <td>${status}</td>
  <td>${balance.toFixed(3)}</td>`;
  tbody.appendChild(row);
};
// displaying customer info on load
const dislpayCustomerTransactionsDetails = (e) => {
  e.preventDefault();
  // using existing code to display customer details
  fetch("/secured/dislpayCustomerDetails")
    .then((res) => res.json())
    .then((data) => {
      data.result.forEach((customer) => wrapCustomerDetails(customer));
    });
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
  const searchCustomer = document.getElementById("searchCustomer").value.trim();
  const searchContact = document.getElementById("searchContact").value.trim();
  const searchAddress = document.getElementById("searchAddress").value.trim();
  if (searchCustomer === "" && searchContact === "" && searchAddress === "") {
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
        alert(`${data.message}`);
      } else {
        data.result.forEach((customer) => wrapCustomerDetails(customer));
      }
    });
};
