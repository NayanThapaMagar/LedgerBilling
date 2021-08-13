// displaying customer on load
const wrapCustomerDetails = (customer) => {
  const selectOptionsCustomer = document.querySelector(
    `.select-options-customer`
  );
  const options = document.createElement("option");
  options.innerHTML = `${customer.customerName}`;
  selectOptionsCustomer.appendChild(options);
};
//wrapping customer ids
const wrapCustomerContacts = (customer) => {
  const selectOptionsCustomerID = document.querySelector(`.customerContact`);
  const options = document.createElement("option");
  options.innerHTML = `${customer.customerContact}`;
  selectOptionsCustomerID.appendChild(options);
};
//keep on removing child untill there exist a first child
const clearCustomerContacts = () => {
  const selectOptionsCustomerID = document.querySelector(`.customerContact`);
  while (selectOptionsCustomerID.firstChild) {
    selectOptionsCustomerID.removeChild(selectOptionsCustomerID.firstChild);
  }
  const options = document.createElement("option");
  options.innerHTML = "**********";
  selectOptionsCustomerID.appendChild(options);
};

fetch("/secured/dislpayCustomerDetails")
  .then((res) => res.json())
  .then((data) =>
    data.result.forEach((customer) => wrapCustomerDetails(customer))
  );

// applying search feature on select
$(document).ready(function () {
  $("select").select2();
});

// on changing customer displaying customer ids
const customerOnChange = (e, selectedCustomer) => {
  e.preventDefault();
  clearCustomerContacts();
  const searchCustomer = selectedCustomer;
  const searchContact = "";
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
        data.result.forEach((customer) => wrapCustomerContacts(customer));
      }
    });
};

//delete customer
const deleteCustomer = (e) => {
  e.preventDefault();
  if (
    document.querySelector(".select-options-customer").value.trim() ==
    "----select----"
  ) {
    alert("Customer not selected!!");
    return;
  }
  if (document.querySelector(".customerContact").value.trim() == "**********") {
    alert("Customer ID not selected!!");
    return;
  }
  //checking if the balance is clear
  const searchCustomer = "";
  const customerContact = document
    .querySelector(".customerContact")
    .value.trim();
  const searchContact = customerContact;
  const searchAddress = "";
  const fetchOptions0 = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchCustomer, searchContact, searchAddress }),
  };
  fetch("/secured/dislpayCustomerDetailsOnSearch", fetchOptions0)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        alert(`${data.message}`);
      } else {
        const customer = data.result[0];
        // console.log(customer.dueBalance);
        if (customer.dueBalance > 0.0001) {
          alert(`Please make sure the customer balance is clear before deleting the account!!!\n The credit amount of the customer is ${customer.dueBalance}`);
          window.location.assign("/secured/deleteAccount");
        } else if(customer.dueBalance < -0.0001){
          alert(`Please make sure the customer balance is clear before deleting the account!!!\n The debit amount of the customer is ${customer.dueBalance*-1}`);
          window.location.assign("/secured/deleteAccount");
        } else {
          //continuing to account deleting process
          var txt;
          var r = confirm(
            `Are you sure you want to continue?\n All the information related to\n ${document
              .querySelector(".select-options-customer")
              .value.trim()}(${document
              .querySelector(".customerContact")
              .value.trim()})\n will be deleted!!!`
          );
          if (r != true) {
            return;
          }
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerContact }),
          };
          fetch("/secured/deleteCustomer", fetchOptions)
            .then((res) => res.json())
            .then((data) => {
              if (!data.success) {
                //failed to delete customer
                alert("Failed to delete customer");
              } else {
                //Customer deleted
                alert("Customer deleted");
                window.location.assign("/secured/deleteAccount");
              }
            });
        }
      }
    });
};
