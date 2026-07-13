const display = document.querySelector('.display.value');
const keys = document.querySelector('.keys');

let current = '0';
let previous = null;
let operator = null;
let waitingForNext = false;

function updateDisplay() {
    display.textContent = current || '0';
}

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target.textContent;

    if (!isNaN(key)) {
        // Number pressed
        if (waitingForNext) {
            current = key;
            waitingForNext = false;
        } else {
            current = current === '0' ? key : current + key;
        }
    } else if (key === 'AC') {
        // Reset everything
        current = '0';
        previous = null;
        operator = null;
        waitingForNext = false;
    } else if (['+', '−', '×', '÷'].includes(key)) {
        // Normalize operator symbols
        const normalized = (key === '−') ? '-' :
            (key === '×') ? '*' :
                (key === '÷') ? '/' : '+';

        if (operator && !waitingForNext) {
            // Perform chained calculation before setting new operator
            const parts = current.trim().split(/[\+\−×÷]/);
            const lastNum = parts[parts.length - 1];
            current = calculate(previous, lastNum, operator).toString();
        }

        operator = normalized;
        previous = current;
        current += ' ' + key + ' '; // show operator in display
        waitingForNext = true;
    } else if (key === '=') {
        if (operator && previous !== null) {
            // Extract last number after operator symbol
            const parts = current.trim().split(/[\+\−×÷]/);
            const lastNum = parts[parts.length - 1];
            current = calculate(previous, lastNum, operator).toString();
            operator = null;
            previous = null;
            waitingForNext = false;
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
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}

// Initialize display
updateDisplay();
