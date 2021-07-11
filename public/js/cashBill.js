//displaying company details
document.getElementById("companyName").innerHTML = localStorage.getItem("companyName");
document.getElementById("companyAddress").innerHTML = localStorage.getItem("address");
document.getElementById("companyContact").innerHTML = localStorage.getItem("contact");
document.getElementById("companyEmail").innerHTML = localStorage.getItem("email");

// applying search feature on select
$(document).ready(function () {
  $("select").select2();
});

// displaying contact number
const selectOptionsCustomer = document.getElementById(
  `select-options-customer`
);
const wrapCustomerDetails = (customer) => {
  const options = document.createElement("option");
  options.innerHTML = `${customer.customerContact}`;
  selectOptionsCustomer.appendChild(options);
};
// getting customer contact number
fetch("/secured/dislpayCustomerDetails")
  .then((res) => res.json())
  .then((data) =>
    data.result.forEach((customer) => wrapCustomerDetails(customer))
  );

// on changing contact displaying customer info
var customerName = "";
var customerId = "";
var customerAddress = "";
var contactNo = "";

const contactOnChange = (e, selectedNo) => {
  e.preventDefault();
  const searchContact = selectedNo;
  const searchCustomer = "";
  const searchAddress = "";
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
        data.result.forEach((customer) => {
          document.getElementById("customerName").value =
            customer.customerName +
            ` (${customer.customerAddress},ID:${customer.customerId})`;
          customerName = customer.customerName;
          customerId = customer.customerId;
          customerAddress = customer.customerAddress;
          contactNo = searchContact;
          const check = "cashBill";
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerId, check }),
          };
          fetch("/secured/dislpayInvoiceDetailsOnSearch", fetchOptions)
            .then((res) => res.json())
            .then((data) => {
              let cashBillNo = data.length + 1;
              document.getElementById("cashBillNo").innerHTML = cashBillNo;
            });
        });
      }
    });
};

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

const amountOnInput = (e, amount) => {
  e.preventDefault();
  if (isNaN(document.querySelector("#rupees").value)) {
    alert("Paid amount invalid!!");
    return;
  }
  document.querySelector('#word').value = inWords(amount);
};

const uploadCashBill = (e) => {
  e.preventDefault();
  if (
    document.querySelector("#select-options-customer").value == "----select----"
  ) {
    alert("Customer Contact not selected!!");
    return;
  }
  if (isNaN(document.querySelector("#rupees").value)) {
    alert("Paid amount invalid!!");
    return;
  }
  // assigining null values to NA data
  const invoiceNo = "****";
  const total = 0;
  const paidAmount = document.querySelector("#rupees").value;
  const deliveredBy = "****";
  const checkedBy = "****";
  const date = document.getElementById("date").value;
  const cashBillNo = document.querySelector("#cashBillNo").innerHTML;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceNo,
        date,
        customerName,
        customerId,
        customerAddress,
        contactNo,
        total,
        paidAmount,
        deliveredBy,
        checkedBy,
        cashBillNo,
      }),
    };
    fetch("/secured/addInvoiceDetails", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          //failed to insert data
          alert("Failed to insert detials of cash Bill!!!");
        } else {
          //Data inserted
          alert(`${data.message}`);
          window.location.assign("/secured/cashBill");
        }
      });
    // console.log("Ok");
};
