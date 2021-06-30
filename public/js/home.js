//displaying company name
document.getElementById("logo").innerHTML = localStorage.getItem("companyName");

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar span');
    // .navbar a:hover, .dropdown:hover .dropbtn
    burger.addEventListener('click',() => {
        // open and closes burger(home, invoice...)
        nav.classList.toggle('nav-active');
        //animating links
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
        // trying to make dropdown overlap other
        // const dropdownContentLinks = document.querySelector('.dropdown-content');
        // dropdownContentLinks.style.cssText = 'display: absolute; transform: translateX(-70%);';
    });
   //     static
// relative
// fixed
// absolute
// sticky
 
}
navSlide();

//logging out
const logoutButton = document.getElementById('logout');
const logoutButton0 = document.getElementById('logout0');
const logoutFunction = () => {
    logoutButton.addEventListener('click', () => {
        fetch("/secured/logout")
        .then((res) => res.json())
        .then((data) => {
        if (!data.success) {
            alert("Failed to logout")
        } else {
            //logout successful
            localStorage.removeItem("companyName");
            localStorage.removeItem("address");
            localStorage.removeItem("email");
            localStorage.removeItem("contact");
            localStorage.removeItem("userName");
            window.location.assign("/login");
        }
        });
    });
    logoutButton0.addEventListener('click', () => {
        fetch("/secured/logout")
        .then((res) => res.json())
        .then((data) => {
        if (!data.success) {
            alert("Failed to logout")
        } else {
            //logout successful
            localStorage.removeItem("companyName");
            window.location.assign("/login");
        }
        });
    });
}
logoutFunction();





 
// getting nav elements
const dropdownContentAccount = document.getElementById("account");
const dropdownContentProduct = document.getElementById("product");
const dropdownContentSystem = document.getElementById("system");
// const navbarA =document.querySelectorAll('.navbar a');
// const dropdownbtn =document.querySelectorAll('.dropdown .dropbtn');
// const downArrow =document.querySelectorAll('#down-arrow');


// display none on body click
const body = document.querySelector('.body');
body.addEventListener('click', () => {
    dropdownContentAccount.style.display = "none";
    dropdownContentProduct.style.display = "none";
    dropdownContentSystem.style.display = "none";
});
 

// account button functionality 
const accountBtn = document.getElementById('accountBtn');
accountBtn.addEventListener('click', () => {
    if(dropdownContentAccount.style.display == "block"){
        dropdownContentAccount.style.display = "none";
        // dropdownbtn.style.cssText = 'background-color:#363636;';

    } else {
        if(dropdownContentProduct.style.display == "none" && dropdownContentSystem.style.display == "none"){
            dropdownContentAccount.style.display = "block";
            // dropdownbtn.style.cssText = 'background-color:#2c2c2c;';
        }
        else {
            dropdownContentProduct.style.display = "none";
            dropdownContentSystem.style.display = "none";
            dropdownContentAccount.style.display = "block";
            // dropdownbtn.style.cssText = 'background-color:#2c2c2c;';
        }
        
    }
});
// product button functionality
const productBtn = document.getElementById('productBtn');
productBtn.addEventListener('click', () => {
    if(dropdownContentProduct.style.display == "block"){
        dropdownContentProduct.style.display = "none";
        // dropdownbtn.style.cssText = 'background-color:#363636;';
    } else {
        if(dropdownContentAccount.style.display == "none" && dropdownContentSystem.style.display == "none"){
            dropdownContentProduct.style.display = "block";
            // dropdownbtn.style.cssText = 'background-color:#2c2c2c;';
        }
        else {
            dropdownContentAccount.style.display = "none";
            dropdownContentSystem.style.display = "none";
            dropdownContentProduct.style.display = "block";
            // dropdownbtn.style.cssText = 'background-color:#2c2c2c;';
        }
        
    }
});
// system(down arrow) button functionality 
const downArrow = document.querySelector('#down-arrow');
downArrow.addEventListener('click', () => {
    if(dropdownContentSystem.style.display == "block"){
        dropdownContentSystem.style.display = "none";
        // navbarA.style.cssText = 'background-color:#363636;';
    } else {
        if(dropdownContentAccount.style.display == "none" && dropdownContentProduct.style.display == "none"){
            dropdownContentSystem.style.display = "block";
            // navbarA.style.cssText = 'background-color:#2c2c2c;';
        }
        else {
            dropdownContentAccount.style.display = "none";
            dropdownContentProduct.style.display = "none";
            dropdownContentSystem.style.display = "block";
            // navbarA.style.cssText = 'background-color:#2c2c2c;';
        }
        
    }
});


// up to here js of header
