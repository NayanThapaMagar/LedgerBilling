const customerId = window.location.href.split("=")[1];
const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: customerId }),
};
fetch("/secured/personalAccountDetails", fetchOptions)
  .then((resp) => resp.json())
  .then((response) => {
    const customer = response.result1[0];
    const invoice = response.result1;
    const productData = response.result2;
    let count = 0;
    document.querySelector("#customerId").innerHTML = customer.customerId;
    document.querySelector("#customerName").innerHTML = customer.customerName;
    document.querySelector("#customerAddress").innerHTML =
      customer.customerAddress;
    document.querySelector("#customerContact").innerHTML =
      customer.customerContact;
    invoice.forEach((invoice) => {
      count = 0;
      console.log("----------------------------------------");
      console.log(invoice.invoiceNo);
      //   console.log(productData.invoiceNo);
      console.log(invoice.date);
      console.log(invoice.total);
      console.log(invoice.paidAmount);
      console.log(invoice.deliveredBy);
      console.log(invoice.checkedBy);
      productData.forEach((productData) => {
        if (invoice.invoiceNo == productData.invoiceNo && count < 3) {
          count++;
          console.log(productData.productName);
        }
      });
      console.log("----------------------------------------");
    });
  });

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