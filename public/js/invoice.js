  // displaying contact no. on load
  const selectOptions = document.getElementById("select-options");
  const wrapCustomerDetails = (customer) => {
    const options = document.createElement("option");
    options.innerHTML = `${customer.customerContact}`;
    selectOptions.appendChild(options);
  };
  
const dislpayDetails = (e) => {
e.preventDefault();
fetch("/secured/dislpayCustomerDetails")
    .then((res) => res.json())
    .then((data) =>
    data.result.forEach((customer) => wrapCustomerDetails(customer))
    );
};

$(document).ready(
    function () {
        $('#select-options').select2();
    }
);




const contactNoChange = (e,selectedNo) => {
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
            // console.log(customer.customerName);
            // console.log(customer.customerAddress);
            // console.log(customer.customerContact);
            // console.log(customer.customerId);
            document.getElementById('customerName').innerHTML = customer.customerName;
            document.getElementById('customerAddress').innerHTML = customer.customerAddress;
            document.getElementById('customerId').innerHTML = customer.customerId;
          })
        }
    }
    );



    // const ajaxreq = new XMLHttpRequest();
    // ajaxreq.open('GET','http://127.0.0.1/frontend/bill/costId.php?costId='+selectedNo,'TRUE');
    // ajaxreq0.send();  

    // ajaxreq.onreadystatechange = function () {
    //     if (ajaxreq.readyState == 4 && ajaxreq.status == 200) {
    //         document.getElementById('costId').innerHTML = ajaxreq.responseText;
    //     }                                                                          
    // }
};