const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.button');
const history = document.querySelector('#history');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleButtonPress(value);
    });
});

function handleButtonPress(value) {
    if (value === 'C') {
        clearLastCharacter();
    } else if (value === 'CE') {
        clearDisplay();
    } else if (value === '=') {
        evaluateExpression();
    } else {
        appendValue(value);
    }
}

function clearLastCharacter() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = '';
    history.innerText = '';
}

function evaluateExpression() {
    try {
        const expression = display.value;
        display.value = eval(expression);
        history.innerText = expression;
    } catch (error) {
        display.value = 'Ошибка';
        history.innerText = '';
    }
}

function appendValue(value) {
   if (isOperator(value)) {
      if (!isLastCharOperator(display.value)) {
         if (/\d/.test(display.value.slice(-1))) {
            evaluateExpression();
         }
         display.value += value;
      }
   } else {
      display.value += value;
   }
}
function clearFirstCharacter() {
    display.value = display.value.slice(1);

}
function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}

function isLastCharOperator(value) {
    const lastChar = value.charAt(value.length - 1);
    return isOperator(lastChar);
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter',];
    if (allowedKeys.includes(key)) {
        event.preventDefault();
        const value = key === 'Enter' ? '=' : key;
        handleButtonPress(value);
    }
    if (event.key === 'Escape') {
        clearDisplay();
    }
    if (event.key === 'Delete') {
       clearFirstCharacter();
    }
    if (event.key === 'Backspace') {
        clearLastCharacter();
    }
});
