const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar span');
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
        // trying to make dropdown overlap other
        // const dropdownContentLinks = document.querySelector('.dropdown-content');
        // dropdownContentLinks.style.cssText = 'display: absolute; transform: translateX(-70%);';
        burger.classList.toggle('toggle');
    });
   //     static
// relative
// fixed
// absolute
// sticky
    
}
navSlide();
// getting elements
const dropdownContentAccount = document.getElementById("account");
const dropdownContentProduct = document.getElementById("product");
const dropdownContentSystem = document.getElementById("system");

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
    } else {
        if(dropdownContentProduct.style.display == "none" && dropdownContentSystem.style.display == "none"){
            dropdownContentAccount.style.display = "block";
        }
        else {
            dropdownContentProduct.style.display = "none";
            dropdownContentSystem.style.display = "none";
            dropdownContentAccount.style.display = "block";
        }
        
    }
});
// product button functionality
const productBtn = document.getElementById('productBtn');
productBtn.addEventListener('click', () => {
    if(dropdownContentProduct.style.display == "block"){
        dropdownContentProduct.style.display = "none";
    } else {
        if(dropdownContentAccount.style.display == "none" && dropdownContentSystem.style.display == "none"){
            dropdownContentProduct.style.display = "block";
        }
        else {
            dropdownContentAccount.style.display = "none";
            dropdownContentSystem.style.display = "none";
            dropdownContentProduct.style.display = "block";
        }
        
    }
});
// system(down arrow) button functionality 
const downArrow = document.querySelector('#down-arrow');
downArrow.addEventListener('click', () => {
    if(dropdownContentSystem.style.display == "block"){
        dropdownContentSystem.style.display = "none";
    } else {
        if(dropdownContentAccount.style.display == "none" && dropdownContentProduct.style.display == "none"){
            dropdownContentSystem.style.display = "block";
        }
        else {
            dropdownContentAccount.style.display = "none";
            dropdownContentProduct.style.display = "none";
            dropdownContentSystem.style.display = "block";
        }
        
    }
});
// up to here js of header