// displaying product on load
const wrapProductDetails = (product) => {
  const selectOptionsProduct = document.querySelector(
    `.select-options-product`
  );
  const options = document.createElement("option");
  options.innerHTML = `${product.productName}`;
  selectOptionsProduct.appendChild(options);
};
//wrapping customer ids
const wrapProductIDs = (product) => {
  const selectOptionsProductID = document.querySelector(`.productID`);
  const options = document.createElement("option");
  options.innerHTML = `${product.productId}`;
  selectOptionsProductID.appendChild(options);
};
//keep on removing child untill there exist a first child
const clearProductIDs = () => {
  const selectOptionsProductID = document.querySelector(`.productID`);
  while (selectOptionsProductID.firstChild) {
    selectOptionsProductID.removeChild(selectOptionsProductID.firstChild);
  }
  const options = document.createElement("option");
  options.innerHTML = "------";
  selectOptionsProductID.appendChild(options);
};

fetch("/secured/dislpayProductDetails")
  .then((res) => res.json())
  .then((data) =>
    data.result.forEach((product) => wrapProductDetails(product))
  );
// applying search feature on select
$(document).ready(function () {
  $("select").select2();
});

// on changing product displaying product ids
const productOnChange = (e, selectedProduct) => {
  e.preventDefault();
  clearProductIDs();
  const productName = selectedProduct;
  const productId = "";
  const productRate = "";
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productName, productId, productRate }),
  };
  fetch("/secured/dislpayProductDetailsOnSearch", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        alert(`${data.message}`);
      } else {
        data.result.forEach((product) => wrapProductIDs(product));
      }
    });
};

//delete product
const addStock = (e) => {
  e.preventDefault();
  if (document.querySelector(".select-options-product").value == "-------select-------") {
    alert("Product not selected!!");
    return;
  }
  if (document.querySelector(".productID").value == "------") {
    alert("Product ID not selected!!");
    return;
  }
  if (isNaN(document.querySelector("#stockQty").value)) {
    alert("Invalid Stock value!!");
    return;
  }
  const stockQty = document.querySelector("#stockQty").value;
  const productID = document.querySelector(".productID").value;
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stockQty, productID }),
  };
  fetch("/secured/updateProduct", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        //Stock Updated
        alert("Stock Updated");
        window.location.assign("/secured/addStock");
      }
    });
};
