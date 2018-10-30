const notifications = document.getElementById('notifications'),
    buttons = document.getElementById('buttons'),
    screen = document.getElementById('screen'),
    regEx = {
        signs: /[+-/*]/i,
        insert: /[+-/*]-?|[0-9]/i
    };

var pointFlag = false,
    zeroFlag = false;

document.body.addEventListener('keydown', function(ev) {

    let lastsym = screen.value.substring(screen.value.length , screen.value.length -1);

    checks(ev);

    if(screen.value.length >= 16) {
        notifications.innerHTML = "<p class='notification'><label>Maximum length value reached.</label></p>";
        resetNot();
        return;
    }

    if (regEx.insert.test(ev.key)) {
        if (ev.key === lastsym && ev.key.match(regEx.signs)) {
            return false;
        } 

        if (pointFlag && ev.key === '.') {
            return;
        }

        if (zeroFlag && ev.key === '0') {
            return;
        }

        if (ev.key.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== ev.key) {
            backspace();
        } 

        if (screen.value  === '' && ev.key === '0') {
            zeroFlag = true;
        } else {
            zeroFlag = false;
        }
        
        if(lastsym === '.') {
            pointFlag = true;
        }
        if(ev.key.match(regEx.signs)) {
            pointFlag = false;
        }

        insert(ev.key);
    }
    return false;
});

buttons.addEventListener('click', function (ev) {
    let lastsym = screen.value.substring(screen.value.length , screen.value.length -1);

    if (ev.target.tagName !== "BUTTON") {
        return;
    }

    checks(ev);

    if(screen.value.length >= 16) {
        notifications.innerHTML = "<p class='notification'><label>Maximum length value reached.</label></p>";
        resetNot();
        return;
    }
    

    let digit = ev.target.value;

    if (ev.key === lastsym && ev.key.match(regEx.signs)) {
        return false;
    }

    if (digit === lastsym && digit.match(regEx.signs)) {
        return;
    }  

    if(pointFlag && ev.target.innerText === '.') {
        return;
    }
    if (zeroFlag && ev.target.innerText === '0') {
        return;
    }

    if (digit.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== digit) {
        backspace();
    }

    if (lastsym === '.') {
        pointFlag = true;
    }

    if (ev.target.innerText.match(regEx.signs)) {
        pointFlag = false;
    }

    if (screen.value  === '' && ev.target.innerText === '0') {
        zeroFlag = true;
    } else {
        zeroFlag = false;
    }
        
    insert(digit);
});

function checks(ev) {

    console.log(ev);

    if ((ev.target.id === 'clear' && ev.type === 'click') || (ev.keyCode === 8 && ev.type === 'keydown')) {
        return backspace();
    }
    if (ev.target.id === 'clearEntry' && ev.type === 'click') {
        return clearScreen();
    }

    if ((ev.target.id === 'equal' && ev.type === 'click') || (ev.keyCode === 13 && ev.type === 'keydown')) {
        return calculate();
    }

    /*
    if ((ev.target.innerText.match(regEx.signs) && ev.type === 'click') || (ev.key.match(regEx.signs) && ev.type === "keydown")) {
        pointFlag = false;
    }
    */
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
    let lastsym = screen.value.substring(screen.value.length , screen.value.length -1);
    if (screen.value !== '') {
        if (lastsym.match(regEx.signs)) {
            return;
        } else {
            //saveLog(screen.value + ' = ' + Math.round(eval(screen.value) * 100) / 100);
            if(eval(screen.value) === Infinity) {
                notifications.innerHTML = "<p class='notification'><label>Can't divide by zeroooo.</label></p>";
                resetNot();
                return;
            }
            screen.value = Math.round(eval(screen.value) * 100) / 100;
        }
    }
}

function resetNot() {
    setTimeout(function () {
        notifications.innerHTML = '';
    }, 3000);
}

