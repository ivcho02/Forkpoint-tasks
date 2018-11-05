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

let peopleArray = localStorage.getItem('people') ? JSON.parse(localStorage.getItem('people')) : [];
//let QUERY = addressField.value;

window.addEventListener('DOMContentLoaded', function() {
    nameField.focus();
});


Storage.prototype.insertPerson = function(person) {
    peopleArray.push(person);
    localStorage.setItem('people', JSON.stringify(peopleArray));
}

/*
form.addEventListener('submit', function (e) {
    e.preventDefault();

});*/

function validateForm() {
    let newPerson = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value,
        website: websiteField.value,
        address: addressField.value
    }
  
    localStorage.insertPerson(newPerson);

    /*function saveStuff(obj) {
        saveData.obj = obj;
        saveData.time = new Date().getTime();
        localStorage.saveData = JSON.stringify(saveData);
    }
    saveStuff(newPerson);*/

   // localStorage.setObject(newPerson.name, newPerson);
    alert('data saved!');
    return false;
}

function clearLocalStorage() {
    localStorage.clear();
}

people.innerHTML += localStorage || "No stored data in local storage!";

console.log(localStorage);

for (let i = 0; i < localStorage.length; i++) {
    let td = document.createElement(td);
    //td.innerHTML = localStorage.people[]
}
//console.log(localStorage.getObject());




