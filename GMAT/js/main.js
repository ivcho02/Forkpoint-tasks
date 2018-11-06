const form = document.getElementById('form');
const nameField = document.getElementById('name');
const addressField = document.getElementById('address');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const websiteField = document.getElementById('website');
/*const regEx = {
    nameField: /[A-Za-z]/g,
    phoneField: /^\+?\d+(-\d+)*$/g,
    websiteField: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/g
};*/
let emails = [];
for (var i = 0; i < localStorage.length+1; i++) {
    peopleLS = JSON.parse(localStorage.getItem(i));
    if(i>0) {
        emails.push(peopleLS.email);
    }
}

window.addEventListener('DOMContentLoaded', function() {
    nameField.focus();
});

emailField.addEventListener('input', function () {
    setValidationError(emailField.value);
});

form.addEventListener('submit', function () {

    let newPerson = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value,
        website: websiteField.value,
        address: addressField.value
    }
    
    if(setValidationError(emailField.value)) {
        let ID = localStorage.length + 1;
        localStorage.insertPerson(ID, newPerson);
        form.submit();
    }
});

function setValidationError(email) {
    if(emails.includes(email)) {
        emailField.setCustomValidity("The email already exists!");
        return false;
    } else {
        emailField.setCustomValidity("");
        return true;
    }
}

Storage.prototype.insertPerson = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}