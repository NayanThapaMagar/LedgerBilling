//to display personal account
const tbody = document.getElementById("customer-transaction-details");
const personalAccount = (e,id) => {
    e.preventDefault();
    window.location.assign(`/secured/personal-account?id=${id}`);
};
let count = 0;
//to display customer info
const wrapCustomerDetails = (customer) => {
  count++;
  // console.log(customer.total);
  var blnc = parseFloat(customer.total);
  var balance0 = blnc.toFixed(3);
  let balance = 0;
  let status = "check";
  // checking is customer balance is in credit or devit
  if (balance0<0) {
    // console.log("negative");
    status = "Dr";
    balance = -1*balance0;
  } else {
    // console.log("positive");
    status = "Cr";
    balance = 1*balance0;
  }
  const row = document.createElement("tr");
  row.innerHTML = `
  <td class="sn">${count}</td>
  <td><button class="btn22" onclick="personalAccount(event,${customer.customerId})">${customer.customerName}</button></td>
  <td>${customer.customerId}</td>
  <td>${customer.customerContact}</td>
  <td>${customer.customerAddress}</td>
  <td>${status}</td>
  <td>${balance}</td>`;
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
      // const id = customer.customerId;
      // const fetchOptions = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ id }),
      // };
      // fetch("/secured/addProduct", fetchOptions)
      //   .then((res) => res.json())
      //   .then((data) => {

      //   });
    });
 
};


// //keep on removing child untill there exist a first child
// //removing previous data before displaying new
// const clearCustomerInfoTable = () => {
//   while (tbody.firstChild) {
//       tbody.removeChild(tbody.firstChild);
//   }
// };
  
//   //displaying customer info on search
//   const dislpayCustomerTransactionsDetailsOnSearch = (e) => {
//     e.preventDefault();
//     count = 0;
//     const searchCustomer = document.getElementById("searchCustomer").value;
//     const searchContact = document.getElementById("searchContact").value;
//     const searchAddress = document.getElementById("searchAddress").value;
//     if ( searchCustomer === "" && searchContact === "" && searchAddress === "") {
//       return alert("Enter atleast one parameter");
//     } 
//     clearCustomerInfoTable();
//     const fetchOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ searchCustomer, searchContact, searchAddress }),
//     };
//     fetch("/secured/dislpayCustomerTransactionsDetailsOnSearch", fetchOptions)
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data.success) {
//         alert(`${data.message}`)
//       } else {
//         data.result.forEach((customer) => wrapCustomerDetails(customer))
//       }
//     }
//     );
//   };