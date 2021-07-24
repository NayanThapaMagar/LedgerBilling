//displaying company name
document.getElementById("companyName").innerHTML =
  localStorage.getItem("companyName");
document.getElementById("companyAddress").innerHTML =
  localStorage.getItem("address");
document.getElementById("companyContact").innerHTML =
  localStorage.getItem("contact");
document.getElementById("companyEmail").innerHTML =
  localStorage.getItem("email");
// to display selected invoice details
const customerId0 = window.location.href.split("=")[1];
const customerId = customerId0.split("&")[0];
const invoiceNo = window.location.href.split("=")[2];
const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: customerId, invoiceNo: invoiceNo }),
};
fetch("/secured/invoiceDetails", fetchOptions)
  .then((resp) => resp.json())
  .then((response) => {
    const customer = response.result1[0];
    const date0 = customer.date;
    const date = date0.split("T")[0];
    const total = customer.total;
    const vat = 0.13 * total;
    const discount = 0.05 * (vat + total);
    const grandTotal0 = total + vat - discount;
    const grandTotal = grandTotal0.toFixed(3);
    const dueAmount0 = grandTotal - customer.paidAmount;
    const dueAmount = dueAmount0.toFixed(3);
    let sn = 1;
    const tbody = document.getElementById("transacted-product");
    const productData = response.result2;
    productData.forEach((productData) => {
      const totalEach0 = productData.productRate * productData.prodcutQty;
      const totalEach = totalEach0.toFixed(3);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="SN1" align="center">${sn}</td>
        <td align="center">${productData.productName}</td>
        <td class="widthQTY" align="center">${productData.productId}</td>
        <td class="productRate1" align="center">${productData.productRate}</td>
        <td class="widthQTY" align="center">${productData.prodcutQty}</td>
        <td class="productAmount1" align="center">${totalEach}</td>`;
      tbody.appendChild(row);
      sn++;
    });
    document.querySelector("#customerId").innerHTML = customer.customerId;
    document.querySelector("#customerName").innerHTML = customer.customerName;
    document.querySelector("#customerAddress").innerHTML =
      customer.customerAddress;
    document.querySelector("#customerContact").innerHTML =
      customer.customerContact;
    document.querySelector("#invoiceNo").innerHTML = customer.invoiceNo;
    document.querySelector("#date").innerHTML = date;
    document.querySelector("#total").innerHTML = total;
    document.querySelector("#vat").innerHTML = vat;
    document.querySelector("#discount").innerHTML = discount;
    document.querySelector("#grandTotal").innerHTML = grandTotal;
    document.querySelector("#paidAmount").innerHTML = customer.paidAmount;
    document.querySelector("#dueAmount").innerHTML = dueAmount;
    document.querySelector("#deliveredBy").innerHTML = customer.deliveredBy;
    document.querySelector("#checkedBy").innerHTML = customer.checkedBy;
  });
function PrintInvoice(elem) {
  var mywindow = window.open("", "PRINT", "height=400,width=700");

  // mywindow.document.write("<html><head><title>" + document.title + "</title>");
  // mywindow.document.write("</head><body >");
  // mywindow.document.write("<h1>" + document.title + "</h1>");
  mywindow.document.write(document.getElementById(elem).innerHTML);
  // mywindow.document.write("</body></html>");

  mywindow.document.close();
  mywindow.focus();
  mywindow.print();
  mywindow.close();

  return true;
}
const toPrint = (e) => {
  e.preventDefault();
  PrintInvoice("invoiceForm");
};
