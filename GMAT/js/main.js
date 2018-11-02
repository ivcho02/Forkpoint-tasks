const form = document.getElementById('form');
const nameField = document.getElementById('name');
const addressField = document.getElementById('address');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const websiteField = document.getElementById('website');
const regEx = {
    nameField: /[A-Za-z]/g,
    phoneField: /^\+?\d+(-\d+)*$/g,
    websiteField: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/g
};

window.addEventListener('DOMContentLoaded', function() {
    nameField.focus();
});


function validateForm() {
    alert(1);
}




