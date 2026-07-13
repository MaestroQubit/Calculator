const display = document.querySelector('.display.value');
const keys = document.querySelector('.keys');

let current = '0';
let previous = null;
let operator = null;

function updateDisplay() {
    display.textContent = current;
}

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target.textContent;

    if (!isNaN(key)) {
        current = current === '0' ? key : current + key;
    } else if (key === 'AC') {
        current = '0';
        previous = null;
        operator = null;
    } else if (['+', '−', '×', '÷'].includes(key)) {
        operator = key;
        previous = current;
        current = '0';
    } else if (key === '=') {
        if (operator && previous !== null) {
            current = calculate(previous, current, operator).toString();
            operator = null;
            previous = null;
        }
    } else if (key === '.') {
        if (!current.includes('.')) current += '.';
    } else if (key === '±') {
        current = (parseFloat(current) * -1).toString();
    } else if (key === '%') {
        current = (parseFloat(current) / 100).toString();
    }

    updateDisplay();
});

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return a + b;
        case '−': return a - b;
        case '×': return a * b;
        case '÷': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}

updateDisplay();