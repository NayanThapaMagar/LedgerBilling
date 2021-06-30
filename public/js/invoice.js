//displaying company name
document.getElementById("companyName").innerHTML = localStorage.getItem("companyName");
document.getElementById("companyAddress").innerHTML = localStorage.getItem("address");
document.getElementById("companyContact").innerHTML = localStorage.getItem("contact");
document.getElementById("companyEmail").innerHTML = localStorage.getItem("email");


//-------------------------------------------ADDING AND REMOVING ROWS----------------------------------------------------//



// for table
let count = 1;
const tbody = document.querySelector(".product-details");
//adding table row
const addRow = (e) => {
  e.preventDefault();
  count++;
  if (count>8) {
    alert("MaxLimit!!")
    return;
  }
  const row = document.createElement("tr");
  row.innerHTML = `
  <td class="SN${count}" align="center">${count}</td>
  <td align="center">
    <select  class="select-options-product${count}" onchange="productOnChange(event,this.value,this.className)" style="width:200px"> 
      <option>----select----</option>
    </select>
  </td>
  <td class="widthQTY" align="center">
    <select  class="productID${count}" onchange="productIdOnChange(event,this.value,this.className)" style="width:70px"> 
      <option>-----</option>
    </select>
  </td>
  <td class="productRate${count}" align="center"></td>
  <td class="widthQTY" align="center">
    <input type="text" class="productQty${count}" oninput="productQtyOnChange(this.className)" required>
  </td>
  <td class="productAmount${count}" align="center">0</td>`;
  tbody.appendChild(row);
  dislpayProducts();
// applying search feature on select
  $(document).ready(
  function () {
      $('select').select2();
  }
  );
  calculateGrandTotal();
};


// deleting last row
const deleteRow = (e) => {
  e.preventDefault();
  // console.log("delete");
  const num = tbody.childElementCount;
  if (num==1) {
    alert("At least one product must be selected!!!")
    return;
  }
  tbody.removeChild(tbody.lastChild);
  count--;
  calculateGrandTotal();
  paidAmountOnInput();
};


//-------------------------------------DISPLAYING DATABASE INFO ON LOAD----------------------------------------------//



// displaying contact no. on load
const selectOptionsCustomer = document.getElementById(`select-options-customer`);
const wrapCustomerDetails = (customer) => {
  const options = document.createElement("option");
  options.innerHTML = `${customer.customerContact}`;
  selectOptionsCustomer.appendChild(options);
};
// displaying product in first row on load 
const wrapProductDetails1 = (product) => {
  const selectOptionsProduct = document.querySelector(`.select-options-product1`);
  // console.log("add");
  const options = document.createElement("option");
  options.innerHTML = `${product.productName}`;
  selectOptionsProduct.appendChild(options);
};
// displaying product on load
const wrapProductDetails = (product) => {
  const selectOptionsProduct = document.querySelector(`.select-options-product${count}`);
  // console.log("add");
  const options = document.createElement("option");
  options.innerHTML = `${product.productName}`;
  selectOptionsProduct.appendChild(options);
};
// displaying product ids of selected prodcut name
const wrapProductIDs = (product,num) => {
  // console.log(num);
  const selectOptionsProductID = document.querySelector(`.productID${num}`);
  const options = document.createElement("option");
  options.innerHTML = `${product.productId}`;
  selectOptionsProductID.appendChild(options);
};
//keep on removing child untill there exist a first child
const clearProductIDs = (num) => {
  const selectOptionsProductID = document.querySelector(`.productID${num}`);
  while (selectOptionsProductID.firstChild) {
    selectOptionsProductID.removeChild(selectOptionsProductID.firstChild);
  }
  const options = document.createElement("option");
  options.innerHTML = '-----';
  selectOptionsProductID.appendChild(options);
};
//to display detials in invoice on load
const dislpayDetails = (e) => {
  e.preventDefault();
  fetch("/secured/dislpayCustomerDetails")
  .then((res) => res.json())
  .then((data) =>
  data.result.forEach((customer) => wrapCustomerDetails(customer))
  );
  fetch("/secured/dislpayProductDetails")
  .then((res) => res.json())
  .then((data) =>
  data.result.forEach((product) => wrapProductDetails1(product))
  );
};
// to display products on adding rows
const dislpayProducts = (e) => {
  fetch("/secured/dislpayProductDetails")
  .then((res) => res.json())
  .then((data) =>
  data.result.forEach((product) => wrapProductDetails(product))
  );
};
// applying search feature on select
$(document).ready(
    function () {
        $('select').select2();
    }
);

//-----------------------------------DISPLAYING INFORMATION ON DIRRERENT ACTIONS-----------------------------------------//


// on changing contact displaying customer info
const contactOnChange = (e,selectedNo) => {
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
          alert(`${data.message}`)
        } 
        else {
          data.result.forEach((customer) => {
            document.getElementById('customerName').innerHTML = customer.customerName;
            document.getElementById('customerAddress').innerHTML = customer.customerAddress;
            document.getElementById('customerId').innerHTML = customer.customerId;
          })
        }
    }
    );
    
    setTimeout(function(){ 
      // console.log(document.getElementById('customerId').innerHTML);
      const invoiceId = document.getElementById('customerId').innerHTML;
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId }),
      };
      fetch("/secured/dislpayInvoiceDetailsOnSearch", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
          let invoiceNo = (data.length + 1);
          document.getElementById('invoiceNo').innerHTML = invoiceNo;
      }
      );
    },
    50);
};

//on changing product(with class no 1) displaying product ids
const productOnChange1 = (e,selectedProduct) => {
  e.preventDefault();
  const num = 1;
  clearProductIDs(num);
  // correcting values
  document.querySelector('.productRate1').innerHTML = 0;
  document.querySelector('.productQty1').value = 0;
  document.querySelector('.productAmount1').innerHTML = 0;
  calculateGrandTotal();
  paidAmountOnInput();
  // to show product's IDs
  const product = selectedProduct;
  const productId = "";
  const productRate = "";
  const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, productId, productRate }),
  };
  fetch("/secured/dislpayProductDetailsOnSearch", fetchOptions)
  .then((res) => res.json())
  .then((data) => {
      if (!data.success) {
        alert(`${data.message}`)
      } 
      else {
        data.result.forEach((product) => wrapProductIDs(product,num))    
      }
  }
  );
};

//on changing product displaying product ids
const productOnChange = (e,selectedProduct,className) => {
  e.preventDefault();
  //getting class name's number
  const no = className.split(" ")[0];
  const nu = no.split("-")[2];
  const num = nu.split("t")[1];
  clearProductIDs(num);
  //correcting values
  document.querySelector(`.productRate${num}`).innerHTML = 0;
  document.querySelector(`.productQty${num}`).value = 0;
  document.querySelector(`.productAmount${num}`).innerHTML = 0;
  calculateGrandTotal();
  paidAmountOnInput();
  // to show product's IDs
  const product = selectedProduct;
  const productId = "";
  const productRate = "";
  const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, productId, productRate }),
  };
  fetch("/secured/dislpayProductDetailsOnSearch", fetchOptions)
  .then((res) => res.json())
  .then((data) => {
      if (!data.success) {
        alert(`${data.message}`)
      } 
      else {
        data.result.forEach((product) => wrapProductIDs(product,num))    
      }
  }
  );
};

//on changing product (with product class no 1) displaying product ids
const productIdOnChange1 = (e,selectedProductId) => {
  e.preventDefault();
  // to display product rate
  const product = "";
  const productId = selectedProductId;
  const productRate = "";
  const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, productId, productRate }),
  };
  fetch("/secured/dislpayProductDetailsOnSearch", fetchOptions)
  .then((res) => res.json())
  .then((data) => {
      if (!data.success) {
        alert(`${data.message}`)
      } 
      else {
        data.result.forEach((product) => {
          document.querySelector(`.productRate1`).innerHTML = product.productRate;
        })    
      }
  }
  );
  // correcting values
  setTimeout(function(){ 
    productQtyOnChange1();
    calculateGrandTotal();
    paidAmountOnInput(); 
  },
  50);
};


//on changing product displaying product ids
const productIdOnChange = (e,selectedProductId,className) => {
  e.preventDefault();
  //getting class name's number
  const no = className.split(" ")[0];
  const num = no.split("D")[1];
  // to display product rate
  const product = "";
  const productId = selectedProductId;
  const productRate = "";
  const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, productId, productRate }),
  };
  fetch("/secured/dislpayProductDetailsOnSearch", fetchOptions)
  .then((res) => res.json())
  .then((data) => {
      if (!data.success) {
        alert(`${data.message}`)
      } 
      else {
        data.result.forEach((product) => {
          document.querySelector(`.productRate${num}`).innerHTML = product.productRate;
        })    
      }
  }
  );
  const ClassName = `productQty${num}`;
  setTimeout(function(){ 
    productQtyOnChange(ClassName);
    calculateGrandTotal();
    paidAmountOnInput(); 
  },
  50);
};


//---------------------------------------CALCULATION OF DIFFERENT VALUES------------------------------------------------//



//calculating amount(of first row) on input
const productQtyOnChange1 = () => {
  const inputQty = document.querySelector('.productQty1').value;
  const rate = document.querySelector(`.productRate1`).innerHTML;
  const amount = inputQty * rate;
  document.querySelector(`.productAmount1`).innerHTML = amount; 
  calculateGrandTotal();
  paidAmountOnInput();
};


//calculating amount on input
const productQtyOnChange = (className) => {
  const num = className.split("y")[1];
  //calculating amount
  const inputQty = document.querySelector(`.productQty${num}`).value;
  const rate = document.querySelector(`.productRate${num}`).innerHTML;
  const amount = parseFloat(inputQty) * parseFloat(rate);
  document.querySelector(`.productAmount${num}`).innerHTML = parseFloat(amount); 
  calculateGrandTotal();
  paidAmountOnInput();
};

//calculating total on input
const calculateGrandTotal = () => {
  let total = 0;
  const num = tbody.childElementCount;
  for(let i=1; i <= num; i++){
    let amnt = document.querySelector(`.productAmount${i}`).innerHTML; 
    total += parseFloat(amnt);
  }
  const vat = (0.13*total);
  const discount = (0.05*(total+vat));
  const grandTotal = total + vat - discount;
  document.querySelector('#total').innerHTML = total;
  document.querySelector('#vat').innerHTML = vat;
  document.querySelector('#discount').innerHTML = discount;
  document.querySelector('#grandTotal').innerHTML = grandTotal;
  document.querySelector('#grandTotal').innerHTML = grandTotal;
};

//calculating due amount on input
const paidAmountOnInput = () => {
  const paidAmount = document.getElementById('paidAmount').value;
  const grandTotal = document.querySelector('#grandTotal').innerHTML;
  const dueAmount = grandTotal - paidAmount;
  document.querySelector('#dueAmount').innerHTML = dueAmount;
};

//-------------------------------------INSERTING INVOICE DATA TO DATABASE----------------------------------------------//

//calculating due amount on input
const saveInvoiceData = (e) => {
  e.preventDefault();
  const invoiceNo = document.getElementById('invoiceNo').innerHTML;
  const date = document.getElementById('date').value;
  const customerId = document.getElementById('customerId').innerHTML;
  const customerName = document.getElementById('customerName').innerHTML;
  const customerAddress = document.getElementById('customerAddress').innerHTML;
  const contactNo = document.getElementById('select-options-customer').value;
  const total = document.getElementById('total').innerHTML;
  const paidAmount = document.getElementById('paidAmount').value;
  const deliveredBy = document.getElementById('deliveredBy').value;
  const checkedBy = document.getElementById('checkedBy').value;
  const num = tbody.childElementCount;
  for(let i=1; i <= num; i++){
    let productName = document.querySelector(`.select-options-product${i}`).value; 
    let productID = document.querySelector(`.productID${i}`).value; 
    if (contactNo == "----select----" ) {
      alert("Select customer!!!");
      return 0;
    }
    if (productName == "----select----" ) {
      alert("Product not selected!!!");
      return 0;
    }
    if ( productID == "-----") {
      alert("Product Id not selected!!!");
      return 0;
    } 
  }
  if (contactNo == "----select----" ) {
    alert("Select customer!!!");
    return 0;
  }
  if (isNaN(total)) {
    alert("Quantity entered is invalid!!!");
    return 0;
  } 
  if (isNaN(paidAmount)) {
    alert("Paid amount entered is invalid!!!");
    return 0;
  } 
  for(let i=1; i <= num; i++){
    let productName = document.querySelector(`.select-options-product${i}`).value; 
    let productID = document.querySelector(`.productID${i}`).value; 
    let productRate = document.querySelector(`.productRate${i}`).innerHTML; 
    let productQty = document.querySelector(`.productQty${i}`).value;      
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceNo, customerId, productName, productID, productRate, productQty  }),
    };
    fetch("/secured/addInvoiceProductDetails", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        //failed to insert data
        alert("Failed to insert selected product detials of invoice!!!");
      } 
    });
  }
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ invoiceNo, date, customerName, customerId, customerAddress, contactNo, total, paidAmount, deliveredBy, checkedBy  }),
  };
  fetch("/secured/addInvoiceDetails", fetchOptions)
  .then((res) => res.json())
  .then((data) => {
    if (!data.success) {
      //failed to insert data
      alert("Failed to insert detials of invoice!!!");

    } 
  });
  const fetchOptions1 = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customerId  }),
  };
  setTimeout(function(){ 
    fetch("/secured/customerBalance", fetchOptions1)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        //failed to insert data
        alert("Failed to insert Devit/Credit amount!!!");
  
      } else {
        console.log(data.result);
        //Data inserted
        alert(`${data.message}`)
        window.location.assign("/secured/invoice");
      }
    });
  },
  50);
 
};