const notifications = document.getElementById('notifications');
const calc = document.getElementById('calculator');
const buttons = document.getElementById('buttons');
const screen = document.getElementById('screen');
const MAX_VALUE_LENGTH = 16;
const regEx = {
    signs: /[.*/+-]-?/gi,
    regLastSign: /(\d*\.)?\d+$/,
    insert: /[.*/+-]-?|[0-9]/
};

let pointFlag = false;
let zeroFlag = false;

document.body.addEventListener('keydown', function (ev) {
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screen.value.length, screenValue.length - 1);

    if (pointFlag && ev.key === '.' ||
        zeroFlag && ev.key === '0' ||
        ev.key === lastsym && ev.key.match(regEx.signs) ||
        lastsym.match(regEx.signs) && ev.key === '.') {
        return;
    }

    checkSpecialButtons(ev);

    if (screenValue.length >= MAX_VALUE_LENGTH) {
        notification("Maximum length value reached.");
        return;
    }

    if (lastsym.match(regEx.signs) && ev.key.match(regEx.signs)) {
        backspace();
    }

    if (regEx.insert.test(ev.key) &&
        !(ev.keyCode >= 112 && ev.keyCode <= 123)) {
        insert(ev.key);
    }
    return;
});

buttons.addEventListener('click', function (ev) {
    if (ev.target.tagName !== "BUTTON") {
        return;
    }
    
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screenValue.length, screenValue.length - 1);
    let digit = ev.target.value;

    if (pointFlag && ev.target.innerText === '.' ||
        zeroFlag && ev.target.innerText === '0' ||
        digit === lastsym && digit.match(regEx.signs) ||
        lastsym.match(regEx.signs) && ev.target.innerText === '.') {
        return;
    }

    checkSpecialButtons(ev);

    if (screenValue.length >= MAX_VALUE_LENGTH) {
        notification("Maximum length value reached.");
        return;
    }

    if (digit.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== digit) {
        backspace();
    }

    insert(digit);
});

function checkSpecialButtons(ev) {
    if (ev.key === undefined) {
        ev.key = 'hack';
    }

    if ((ev.target.id === 'clear' && ev.type === 'click') || (ev.keyCode === 8 && ev.type === 'keydown')) {
        return backspace();
    }
    if (ev.target.id === 'clearEntry' && ev.type === 'click') {
        return clearScreen();
    }

    if ((ev.target.id === 'equal' && ev.type === 'click') || (ev.keyCode === 13 && ev.type === 'keydown')) {
        return calculate();
    }
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screenValue.length, screenValue.length - 1);

    if (lastsym === '.') {
        pointFlag = true;
    } else if ((ev.target.innerText.match(regEx.signs) && ev.type === 'click') ||
        (ev.key.match(regEx.signs) && ev.type === 'keydown')) {
        pointFlag = false;
    }
    if ((screenValue === '' && ev.target.innerText === '0' && ev.type === 'click') ||
        (screenValue === '' && ev.key === '0' && ev.type === 'keydown')) {
        zeroFlag = true;
    } else {
        zeroFlag = false;
    }
}

function insert(symbol) {
    screen.value += symbol;
}

function clearScreen() {
    screen.value = '';
}

function backspace() {
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screenValue.length, screenValue.length - 1);

    if (lastsym.match(regEx.signs)) {
        let strval = screen.value.substring(0, screen.value.length - 1);
        let lastIndexSign = strval.search(regEx.regLastSign);

        res = strval.substr(lastIndexSign);

        if (res.includes('.')) {
            pointFlag = true;
        } else {
            pointFlag = false;
        }
    }
    if (lastsym === '.') {
        pointFlag = false;
    }
    screen.value = screen.value.substring(0, screen.value.length - 1);
}

function calculate() {
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screenValue.length, screenValue.length - 1);

    if (screenValue !== '') {
        if (lastsym.match(regEx.signs)) {
            return;
        } else {
            if (eval(screenValue) === Infinity) {
                notificaiton("Can't divide by zeroooo.");
                return;
            }

            screen.value = Math.round(eval(screenValue) * 100) / 100;

            if (screen.value.includes('.')) {
                pointFlag = true;
            } else {
                pointFlag = false;
            }
        }
    }
}

function notification(msg) {
    notifications.innerHTML = "<p class='notification'><label>" + msg + "</label></p>";
    calc.classList.add('messageShake');

    setTimeout(function () {
        notifications.innerHTML = '';
        calc.classList.remove('messageShake');
    }, 3000);
}