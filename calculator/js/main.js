const notifications = document.getElementById('notifications'),
    calc = document.getElementById('calculator');
    buttons = document.getElementById('buttons'),
    screen = document.getElementById('screen'),
    regEx = {
        signs: /[+-/*]/i,
        insert: /[+-/*]-?|[0-9]/i
    };

let pointFlag = false,
    zeroFlag = false;

document.body.addEventListener('keydown', function(ev) {
    let screenValue = screen.value,
        lastsym = screenValue.substring(screen.value.length , screenValue.length -1);

    checkSpecialButtons(ev);

    if(screenValue.length >= 16) {
        notifications.innerHTML = "<p class='notification'><label>Maximum length value reached.</label></p>";
        calc.style = "animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both; transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px;";
        resetNot();
        return;
    }

    if (regEx.insert.test(ev.key)) {
        if (pointFlag && ev.key === '.' 
            || zeroFlag && ev.key === '0'
            || ev.key === lastsym && ev.key.match(regEx.signs)) {
            return;
        }

        if (ev.key.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== ev.key) {
            backspace();
        } 

        if (screenValue  === '' && ev.key === '0') {
            zeroFlag = true;
        } else {
            zeroFlag = false;
        }
        
        if(lastsym === '.') {
            pointFlag = true;
        } else if (ev.key.match(regEx.signs)) {
            pointFlag = false;
        }

        insert(ev.key);
    }
});

buttons.addEventListener('click', function (ev) {
    let screenValue = screen.value,
        lastsym = screenValue.substring(screenValue.length , screenValue.length -1);

    if (ev.target.tagName !== "BUTTON") {
        return;
    }

    checkSpecialButtons(ev);

    if(screenValue.length >= 16) {
        notifications.innerHTML = "<p class='notification'><label>Maximum length value reached.</label></p>";
        calc.style = "animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both; transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px;";
        resetNot();
        return;
    }
    
    let digit = ev.target.value;

    if (pointFlag && ev.target.innerText === '.' 
        || zeroFlag && ev.target.innerText === '0' 
        || digit === lastsym && digit.match(regEx.signs)) {
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
    screen.value = screen.value.substring(0, screen.value.length - 1);
}

function calculate() {
    let screenValue = screen.value,
        lastsym = screenValue.substring(screenValue.length , screenValue.length -1);

    if (screenValue !== '') {
        if (lastsym.match(regEx.signs)) {
            return;
        } else {
            //saveLog(screenValue + ' = ' + Math.round(eval(screenValue) * 100) / 100);
            if (eval(screenValue) === Infinity) {
                notifications.innerHTML = "<p class='notification'><label>Can't divide by zeroooo.</label></p>";
                calc.style = "animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both; transform: translate3d(0, 0, 0); backface-visibility: hidden; perspective: 1000px;";
                resetNot();
                return;
            }
            screen.value = Math.round(eval(screenValue) * 100) / 100;
        }
    }
}

function resetNot() {
    setTimeout(function () {
        notifications.innerHTML = '';
        calc.style = '';
    }, 3000);
}