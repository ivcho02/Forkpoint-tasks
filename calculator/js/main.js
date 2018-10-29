const wrapper = document.getElementById('wrapper'),
    buttons = document.getElementById('buttons'),
    screen = document.getElementById('screen'),
    divLogs = document.getElementById('logs'),
    signs = ['+', '-', '/', '*', '.'],
    regEx = {
        signs: /[+-/*]/i,
        insert: /[+-/*]-?|[0-9]/i
    };

var pointFlag = false;

document.body.addEventListener('keydown', function(ev) {
    let lastsym = screen.value.substring(screen.value.length , screen.value.length -1);
    
    
    

    if (ev.keyCode === 13) {
        calculate();
    }

    if (ev.keyCode === 8) {
        backspace();
    }

    //console.log(ev);

    if (regEx.insert.test(ev.key)) {
        if (ev.key === lastsym && ev.key.match(regEx.signs)) {
            return false;
        } 

        if (ev.key.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== ev.key) {
            backspace();
        } 

        if(pointFlag && ev.keyCode === 110) {
            return;
        }
       

        
        insert(ev.key);
        
        if(lastsym === '.') {
            pointFlag = true;
        }
        if(ev.key.match(regEx.signs)) {
            pointFlag = false;
        }

        console.log(pointFlag);
    }
    return false;
});

buttons.addEventListener('click', function (ev) {
    //console.log(ev);
    let lastsym = screen.value.substring(screen.value.length , screen.value.length -1);
    
    if (ev.target.tagName !== "BUTTON") {
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

    if (digit === lastsym && digit.match(regEx.signs)) {
        return;
    } 

    if (digit.match(regEx.signs) && lastsym.match(regEx.signs) && lastsym !== digit) {
        backspace();
    } 
        
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
    let lastsym = screen.value.substring(screen.value.length , screen.value.length -1);
    if (screen.value !== '') {
        if (lastsym.match(regEx.signs)) {
            return;
        } else {
            saveLog(screen.value + ' = ' + Math.round(eval(screen.value) * 100) / 100);
            screen.value = Math.round(eval(screen.value) * 100) / 100;
        }
    }
}

function saveLog(log) {
    //alert(1);
    //wrapper.innerHTML += '<label>'+ log + '</label>';
}