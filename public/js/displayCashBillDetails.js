//displaying company details
document.getElementById("companyName").innerHTML =
  localStorage.getItem("companyName");
document.getElementById("companyAddress").innerHTML =
  localStorage.getItem("address");
document.getElementById("companyContact").innerHTML =
  localStorage.getItem("contact");
document.getElementById("companyEmail").innerHTML =
  localStorage.getItem("email");

//convert figures to words
var a = [
  "",
  "One ",
  "Two ",
  "Three ",
  "Four ",
  "Five ",
  "Six ",
  "Seven ",
  "Eight ",
  "Nine ",
  "Ten ",
  "Eleven ",
  "Twelve ",
  "Thirteen ",
  "Fourteen ",
  "Fifteen ",
  "Sixteen ",
  "Seventeen ",
  "Eighteen ",
  "Nineteen ",
];
var b = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}

// to display selected cash bill details
const customerId0 = window.location.href.split("=")[1];
const customerId = customerId0.split("&")[0];
const cashBillNo = window.location.href.split("=")[2];

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: customerId, cashBillNo: cashBillNo }),
};
fetch("/secured/cashBillDetails", fetchOptions)
  .then((resp) => resp.json())
  .then((response) => {
    const customer = response.result[0];
    const date0 = customer.date;
    const date = date0.split("T")[0];
    document.querySelector("#cashBillNo").innerHTML = customer.cashBillNo;
    document.querySelector("#date").value = date;
    document.querySelector("#customerName").value = `${customer.customerName} (${customer.customerAddress},ID:${customerId})`;
    document.querySelector("#customerContact").value = customer.customerContact;
    document.querySelector("#rupees").value = customer.paidAmount;
    document.querySelector("#word").value = inWords(
      parseInt(customer.paidAmount)
    );
  });

// function PrintInvoice(elem) {
//   var mywindow = window.open("", "PRINT", "height=400,width=700");

//   // mywindow.document.write("<html><head><title>" + document.title + "</title>");
//   // mywindow.document.write("</head><body >");
//   // mywindow.document.write("<h1>" + document.title + "</h1>");
//   // mywindow.document.write("<h2>"+document.getElementById("companyName").innerHTML+"</h2>");
//   // mywindow.document.write("<p>"+document.getElementById("companyAddress").innerHTML+"</p>"); 
//   // mywindow.document.write("<p>"+document.getElementById("companyContact").innerHTML+"</p>"); 
//   // mywindow.document.write("<p>"+document.getElementById("companyEmail").innerHTML+"</p>"); 
//   // mywindow.document.write("<p>Cash Bill No:"+document.querySelector("#cashBillNo").innerHTML+"</p>"); 
//   // mywindow.document.write(`<input type="date readonly/ >"`); 
//   // document.querySelector("#date").value
//   // mywindow.document.write(document.querySelector("#customerName").value); 
//   // mywindow.document.write(document.querySelector("#customerContact").value); 
//   // mywindow.document.write(document.querySelector("#rupees").value); 
//   // mywindow.document.write(document.querySelector("#word").value); 
//   mywindow.document.write(document.getElementById(elem).innerHTML);
//   // mywindow.document.write(document.querySelector("#cashBillNo").innerHTML);
//   // mywindow.document.write(document.querySelector("#date").value);
//   // mywindow.document.write(document.getElementById(elem).nodeValue);
//   // mywindow.document.write("</body></html>");

//   mywindow.document.close();
//   mywindow.focus();
//   mywindow.print();
//   mywindow.close();

//   return true;
// }
// const toPrint = (e) => {
//   e.preventDefault();
//   PrintInvoice("cashBill");
// };
