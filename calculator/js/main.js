var buttons = document.getElementById('buttons'),
    screen = document.getElementById('screen'),
    pattern = new RegExp(/^[-+]?[0-9]+([-+*/]+[-+]?[0-9]+)*$/),
    asd = document.getElementById('clearEntry');

screen.addEventListener('keydown' , function(ev) {

    if(ev.keyCode === 13) {
        calculate();
    }

    
    //return /^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*)+$/g.test(event.key);
    //console.log(ev);
    /*var charCode = (ev.which) ? ev.which : ev.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return console.log(ev.key);
    } else {
        //console.log(ev)
       //insert(ev.key);
       
    } */
});


buttons.addEventListener('click', function(ev) {
    //console.log(ev);
    
    if(ev.target.tagName !== "BUTTON") {
        return;
    }

    if (ev.target.id === 'clearEntry') {
        clearScreen();
        return;
    }
    if (ev.target.id === 'clear') {
        backspace();
        return;
    }
    if (ev.target.id === 'equal') {
        calculate();
        return;
    }
    let digit = ev.target.value;


    insert(digit);
});

function insert(symbol) {
    screen.value += symbol;
}

function clearScreen() {
    screen.value = '';
}

function backspace() {
    screen.value = screen.value.substring(0, screen.value.length - 1);
}

function calculate() {
    screen.value = eval(screen.value).toFixed(2);
}