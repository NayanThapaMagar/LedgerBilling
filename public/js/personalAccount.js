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
    let sn = 1;
    let status = "Check";
    let dueAmount0 = 0;
    let dueAmount = 0;
    document.querySelector("#customerId").innerHTML = customer.customerId;
    document.querySelector("#customerName").innerHTML = customer.customerName;
    document.querySelector("#customerAddress").innerHTML =
      customer.customerAddress;
    document.querySelector("#customerContact").innerHTML =
      customer.customerContact;
    invoice.forEach((invoice) => {
      count = 0;
      const total = invoice.total;
      const grandTotal0 = (total + (0.13 * total) - (0.05 * ((0.13 * total)+total)));
      const grandTotal = grandTotal0.toFixed(3);
      dueAmount0 += (total + (0.13 * total) - (0.05 * ((0.13 * total)+total)) - invoice.paidAmount);
      dueAmount = dueAmount0.toFixed(3);
      const date0 = invoice.date;
      const date = date0.split("T")[0];
      if (dueAmount > 0) {
        status = "Cr";
        dueAmount = 1*dueAmount;
      } else if (dueAmount < 0) {
        status = "Dr";
        dueAmount = -1*dueAmount;
      } else {
        status = "Clear";
      }
      let prdt0 = "";
      let products = "";
      productData.forEach((productData) => {
        if (invoice.invoiceNo == productData.invoiceNo && count < 3) {
          count++;
          const prdt1 = productData.productName + ",";
          prdt0 += prdt1;
        }
      });
      products = prdt0 + "...";
      const tbody = document.getElementById("invoice-transaction-details");
      const row = document.createElement("tr");
      row.innerHTML = `
      <td class="sn tableData">${sn}</td>
      <td class="tableData">${date}</td>
      <td class="tableData">${products}</td>
      <td class="tableData">${invoice.invoiceNo}</td>
      <td class="tableData">${invoice.paidAmount}</td>
      <td class="tableData">${grandTotal}</td>
      <td class="tableData">${status}</td>
      <td class="tableData">${dueAmount}</td>`;
      tbody.appendChild(row);
      sn++;
    });
    document.querySelector(".status").innerHTML = status;
    document.querySelector(".balance").innerHTML = dueAmount;
  });
