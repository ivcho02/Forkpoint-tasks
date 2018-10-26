var buttons = document.getElementById('buttons'),
    screen = document.getElementById('screen');

screen.addEventListener('keypress' , function(ev) {
    //console.log(ev);
    var charCode = (ev.which) ? ev.which : ev.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        console.log('invalid symbols');
        backspace();
    }
});

buttons.addEventListener('click', function(ev) {
    //console.log(ev);

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
    let digit = ev.target.innerText;

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
    screen.value = eval(screen.value).toFixed();
}