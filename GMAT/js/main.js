const form = document.getElementById('form');
const people = document.getElementById('peopleDiv');
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
let saveData = JSON.parse(localStorage.saveData || null) || {};

//let QUERY = addressField.value;

window.addEventListener('DOMContentLoaded', function() {
    nameField.focus();
});

addressField.style = '';

function validateForm() {

    let newPerson = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value,
        website: websiteField.value,
        address: addressField.value
    }

    function saveStuff(obj) {

        saveData.obj = obj;
        saveData.time = new Date().getTime();
        localStorage.saveData = JSON.stringify(saveData);
    }

    if (saveData.time) alert("You were here: " + saveData.time);

    saveStuff(newPerson);
    return false;
}

function clearLocalStorage() {
    localStorage.clear();
}

people.innerHTML += saveData.obj.name || "No stored data in local storage!";
console.log(saveData.obj);




