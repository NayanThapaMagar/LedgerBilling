const personalAccount = (e, Id, reciptNo, transactionType) => {reciptNo
  e.preventDefault();
  if (transactionType==1) {
    window.location.assign(`/secured/invoice-details?id=${Id}&invoiceNo=${reciptNo}`);
  }
  if (transactionType==2) {
    window.location.assign(`/secured/cashBill-details?id=${Id}&cashBillNo=${reciptNo}`);
  }
};

//to display transaction summary
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
      const grandTotal0 = (total+(0.13*total)-(0.05*(total+(0.13*total))));
      const grandTotal = grandTotal0;
      dueAmount0 += ((total+(0.13*total)-(0.05*(total+(0.13*total)))) - invoice.paidAmount);
      dueAmount = dueAmount0;
      const date0 = invoice.date;
      const date = date0.split("T")[0];
      if (dueAmount0 > 0.0001) {
        status = "Cr";
        dueAmount = 1*dueAmount;
      } else if (dueAmount0 < -0.0001) {
        status = "Dr";
        dueAmount = -1*dueAmount;
      } else {
        status = "Clear";
        dueAmount = 0;
      }
      let prdt0 = "";
      let transactionOf = "";
      let reciptNo = "";
      let transactionType = "";
      if (invoice.invoiceNo!="****") {
        productData.forEach((productData) => {
          if (invoice.invoiceNo == productData.invoiceNo && count < 3) {
            count++;
            const prdt1 = productData.productName + ",";
            prdt0 += prdt1;
          }
        });
        transactionOf = prdt0 + "...";
        reciptNo = invoice.invoiceNo;
        transactionType = 1;
      } else {
        transactionOf = "CASH";
        reciptNo = invoice.cashBillNo;
        transactionType = 2;
      }

      const tbody = document.getElementById("invoice-transaction-details");
      const row = document.createElement("tr");
      row.innerHTML = `
      <td class="sn tableData">${sn}</td>
      <td class="tableData">${date}</td>
      <td class="tableData"><button class="btn22" onclick="personalAccount( event, ${customer.customerId}, ${reciptNo}, ${transactionType})">${transactionOf}</button></td>
      <td class="tableData">${reciptNo}</td>
      <td class="tableData">${invoice.paidAmount}</td>
      <td class="tableData">${grandTotal.toFixed(3)}</td>
      <td class="tableData">${status}</td>
      <td class="tableData">${dueAmount.toFixed(3)}</td>`;
      tbody.appendChild(row);
      sn++;
    });
    document.querySelector(".status").innerHTML = status;
    document.querySelector(".balance").innerHTML = dueAmount.toFixed(3);
  });
