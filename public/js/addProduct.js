//adding new customer info
const addProduct = (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const rate = document.getElementById("productRate").value;
    const stockQty = document.getElementById("stockQty").value;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, rate, stockQty }),
    };
    fetch("/secured/addProduct", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          //failed to insert data
          alert(`${data.message}`)
        } else {
          //Data inserted
          alert("Data Inserted");
          window.location.assign("/secured/addProduct");
        }
      });
    // console.log("add p");
  };