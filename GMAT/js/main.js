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

form.addEventListener('submit', function () {
    let newPerson = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value,
        website: websiteField.value,
        address: addressField.value
    }
    
    if(emails.includes(newPerson.email)) {
        alert('the email exists');
        return false;
    } else {
        let ID = localStorage.length + 1;
        localStorage.insertPerson(ID, newPerson);
        form.submit();
    }
});

Storage.prototype.insertPerson = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}