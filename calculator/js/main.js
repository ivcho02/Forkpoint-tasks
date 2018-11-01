const notifications = document.getElementById('notifications');
const calc = document.getElementById('calculator');
const buttons = document.getElementById('buttons');
const screen = document.getElementById('screen');
const regEx = {
        signs: /[.*/+-]-?/gi,
        insert: /[.*/+-]-?|[0-9]/
    };

let pointFlag = false;
let zeroFlag = false;

document.body.addEventListener('keydown', function (ev) {
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screen.value.length , screenValue.length -1);

    checkSpecialButtons(ev);

    if (screenValue.length >= 16) {
        notification("Maximum length value reached.");
        return;
    }

    if (regEx.insert.test(ev.key) 
        && !(ev.keyCode >= 112 && ev.keyCode <= 123)) {
        if (pointFlag && ev.key === '.' 
            || zeroFlag && ev.key === '0'
            || ev.key === lastsym && ev.key.match(regEx.signs) 
            || lastsym.match(regEx.signs) && ev.key === '.') {
            return;
        }
        
        if (screenValue  === '' && ev.key === '0') {
            zeroFlag = true;
        } else {
            zeroFlag = false;
        }
        
        if (lastsym === '.') {
            pointFlag = true;
        } else if (ev.key.match(regEx.signs)) {
            pointFlag = false;
        }

        if (lastsym.match(regEx.signs) && ev.key.match(regEx.signs)) {
            backspace();
        } 

        insert(ev.key);
    } 
    return;
});

buttons.addEventListener('click', function (ev) {
    let screenValue = screen.value;
    let lastsym = screenValue.substring(screenValue.length , screenValue.length -1);

    if (ev.target.tagName !== "BUTTON") {
        return;
    }

    checkSpecialButtons(ev);

    if (screenValue.length >= 16) {
        notification("Maximum length value reached.");
        return;
    }
    
    let digit = ev.target.value;

    if (pointFlag && ev.target.innerText === '.' 
        || zeroFlag && ev.target.innerText === '0' 
        || digit === lastsym && digit.match(regEx.signs)
        || lastsym.match(regEx.signs) && ev.target.innerText === '.') {
        return;
    }

    if (digit.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== digit) {
        backspace();
    }

    if (lastsym === '.') {
        pointFlag = true;
    } else if (ev.target.innerText.match(regEx.signs)) {
        pointFlag = false;
    }

    if (screenValue  === '' && ev.target.innerText === '0') {
        zeroFlag = true;
    } else {
        zeroFlag = false;
    }
        
    insert(digit);
});

function checkSpecialButtons(ev) {

    if ((ev.target.id === 'clear' && ev.type === 'click') || (ev.keyCode === 8 && ev.type === 'keydown')) {
        return backspace();
    }
    if (ev.target.id === 'clearEntry' && ev.type === 'click') {
        return clearScreen();
    }

    if ((ev.target.id === 'equal' && ev.type === 'click') || (ev.keyCode === 13 && ev.type === 'keydown')) {
        return calculate();
    }
}

function insert(symbol) {
    screen.value += symbol;
}

function clearScreen() {
    screen.value = '';
}

function backspace() {
    let screenValue = screen.value,
        lastsym = screenValue.substring(screenValue.length , screenValue.length -1);

    if (lastsym.match(regEx.signs)) {
        
        let strval = screen.value.substring(0, screen.value.length -1),
            indexSign1 = strval.lastIndexOf('+') + 1,
            indexSign2 = strval.lastIndexOf('-') + 1,
            indexSign3 = strval.lastIndexOf('/') + 1,
            indexSign4 = strval.lastIndexOf('*') + 1;
        res = strval.substr(Math.max(indexSign1,indexSign2,indexSign3,indexSign4));

        if(res.includes('.')) {
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
    let lastsym = screenValue.substring(screenValue.length , screenValue.length -1);

    if (screenValue !== '') {
        if (lastsym.match(regEx.signs)) {
            return;
        } else {
            //saveLog(screenValue + ' = ' + Math.round(eval(screenValue) * 100) / 100);
            if (eval(screenValue) === Infinity) {
                notificaiton("Can't divide by zeroooo.");
                return;
            }
            screen.value = Math.round(eval(screenValue) * 100) / 100;
            if(screen.value.includes('.')) {
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