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
        alert(`${data.message}`);
      } else {
        data.result.forEach((product) => wrapProductIDs(product));
      }
    });
};

//delete product
const deleteProduct = (e) => {
  e.preventDefault();
  var txt;
  var r = confirm("Are you sure you want to continue?");
  if (r != true) {
    return;
  }
  // const name = document.querySelector(".select-options-product").value;
  const id = document.querySelector(".productID").value;
  // console.log(name);
  // console.log(id);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  };
  fetch("/secured/deleteProduct", fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        //failed to delete product
        alert("Failed to delete product");
      } else {
        //Product deleted
        alert("Product deleted");
        window.location.assign("/secured/deleteProduct");
      }
    });
};
