let count = 0;
//to display product info
const tbody = document.getElementById("product-details");
const wrapCustomerDetails = (product) => {
  count++;
  const row = document.createElement("tr");
  // row = <tr></tr>
  row.innerHTML = `
  <td class="sn" align="center">${count}</td>
  <td align="center">${product.productName}</td>
  <td align="center">${product.productId}</td>
  <td align="center">${product.productRate}</td>
  <td align="center">${product.productStock}</td>`;
  tbody.appendChild(row);
};
// displaying product info on load
fetch("/secured/dislpayProductDetails")
  .then((res) => res.json())
  .then((data) =>
    data.result.forEach((product1) => wrapCustomerDetails(product1))
  );

//removing previous data before displaying new
const clearProductInfoTable = () => {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
};

//displaying product info on search
const dislpayProductDetailsOnSearch = (e) => {
  e.preventDefault();
  count = 0;
  const productName = document.getElementById("productName").value.trim();
  const productId = document.getElementById("productId").value.trim();
  const productRate = "";
  if (productName === "" && productId === "" && productRate === "") {
    return alert("Enter atleast one parameter");
  }
  clearProductInfoTable();
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
        data.result.forEach((product1) => wrapCustomerDetails(product1));
      }
    });
};
