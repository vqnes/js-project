let resultBlock = document.getElementById('calc-result');
let input = document.querySelector("#calc-result input");
let inputExpression = document.getElementById("calc-expression");

let numButtons = document.getElementsByClassName('num-button');
let button0 = document.getElementById("button-0");

let buttonDot = document.getElementById("button-dot");

let buttonLeftBracket = document.getElementById("button-left-bracket");
let buttonRightBracket = document.getElementById("button-right-bracket");

let constButtons = document.getElementsByClassName('const-button');

let buttonSin = document.getElementById("button-sin");
let buttonCos = document.getElementById("button-cos");
let buttonTan = document.getElementById("button-tan");

let operationButtons = document.getElementsByClassName('operation-button');
let buttonPow = document.getElementById('button-pow');

let buttonLog = document.getElementById("button-log");
let buttonLn = document.getElementById("button-ln");
let buttonPi = document.getElementById('button-pi');
let buttonEuler = document.getElementById('button-e');

let buttonFactorial = document.getElementById("button-factorial");

let buttonRadical = document.getElementById("button-radical");

let buttonClear = document.getElementById("button-clear");

let buttonResult = document.getElementById("button-result");

input.addEventListener('focus', fun => { resultBlock.style.border = '1px solid #4169E1'; }, true);

input.addEventListener('blur', fun => { resultBlock.style.border = '1px solid #C0C0C0'; }, true);

for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].addEventListener('click', addNumInInput);
}

buttonDot.addEventListener('click', function () {
    let addedValue = this.dataset.value;
    let inputValue = input.value;
    let inputSplit = inputValue.split(/[-%\/\*\+(]/);

    if (
        /[(\.]$/.test(inputValue) ||
        inputSplit[inputSplit.length - 1].indexOf('.') > -1
    ) {
        input.focus();
        return;
    }

    if (/[eπ)!]$/.test(inputValue)) {
        input.value += '*';
    }

    input.value += addedValue;

    input.focus();
});

buttonLeftBracket.addEventListener('click', addConstInInput);
buttonRightBracket.addEventListener('click', function () {
    let addedValue = this.dataset.value;
    let inputValue = input.value;
    let amountLeftBrackets = inputValue.split('(').length - 1;
    let amountRightBrackets = inputValue.split(')').length - 1;

    if (
        amountLeftBrackets !== amountRightBrackets &&
        !/[-(\.%\/\*\+]$/.test(inputValue)
    ) {
        input.value += addedValue;
    }

    input.focus();
});

for (let i = 0; i < constButtons.length; i++) {
    constButtons[i].addEventListener('click', addConstInInput);
}

for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', addOperationSymbolInInput);
}

buttonFactorial.addEventListener('click', function () {
    let inputValue = input.value;

    if (
        inputValue !== '' &&
        !/[-\+%\*\/\.(!]$/.test(inputValue)
    ) {
        input.value += this.dataset.value;
    }

    input.focus();
});

buttonClear.addEventListener('click', fun => {
    let inputValue = input.value;
    let lastKey = inputValue.length - 1;

    if (lastKey >= 0 && inputValue[lastKey] === '(') {
        let inputSplit = inputValue.split(/[-%\/\*\+0-9(]/);
        let penultInputSplit = inputSplit[inputSplit.length - 2];

        lastKey = inputValue.length - penultInputSplit.length - 1;
    }

    input.value = inputValue.slice(0, lastKey);
    input.focus();
});

input.addEventListener('keydown', function (event) {
    input.selectionStart = input.value.length;
    event.preventDefault();

    switch (event.key) {
        case 'Backspace':
            buttonClear.click();
            return;
        case 'Enter':
            buttonResult.click();
            return;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            addNumInInput(null, event.key);
            return;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            addOperationSymbolInInput(null, event.key);
            return;
        case '^':
            addOperationSymbolInInput(null, buttonPow.dataset.value);
            return;
        case '(':
            addConstInInput(null, event.key);
            return;
        case ')':
            buttonRightBracket.click();
            return;
        case '!':
            buttonFactorial.click();
            return;
        case '.':
            buttonDot.click();
            return;
        case 'q':
            addConstInInput(null, buttonRadical.dataset.value);
            return;
        case 'e':
            addConstInInput(null, buttonEuler.dataset.value);
            return;
        case 'p':
            addConstInInput(null, buttonPi.dataset.value);
            return;
        case 'g':
            addConstInInput(null, buttonLog.dataset.value);
            return;
        case 'l':
            addConstInInput(null, buttonLn.dataset.value);
            return;
        case 's':
            addConstInInput(null, buttonSin.dataset.value);
            return;
        case 't':
            addConstInInput(null, buttonTan.dataset.value);
            return;
        case 'c':
            addConstInInput(null, buttonCos.dataset.value);
            return;
    }
}, true);

buttonResult.addEventListener('click', function () {
    let expression = input.value;
    let amountLeftBrackets = expression.split('(').length - 1;
    let amountRightBrackets = expression.split(')').length - 1;

    if (
        expression !== '' &&
        !/[-%\/\*\+\.]$/.test(expression) &&
        amountLeftBrackets === amountRightBrackets
    ) {
        expression = expression.replaceAll('sin', 'Math.sin');
        expression = expression.replaceAll('cos', 'Math.cos');
        expression = expression.replaceAll('tan', 'Math.tan');
        expression = expression.replaceAll('log', 'Math.log10');
        expression = expression.replaceAll('ln', 'Math.log');
        expression = expression.replaceAll('√', 'Math.sqrt');
        expression = expression.replaceAll('e', 'Math.E');
        expression = expression.replaceAll('π', 'Math.PI');

        let expressionIndexes;

        let powIndexes = getIndexesSubstrInStr(expression, '^');
        if (powIndexes.length > 0) {
            for (let i = 0; i < powIndexes.length; i++) {
                powIndexes[i] = expression.indexOf('^');

                expressionIndexes = getIndexesSubexpression(expression, powIndexes[i], true);

                let leftExpression = expression.substr(0, expressionIndexes[0]);
                let expressionWithPow = 'Math.pow(' + expression.substr(expressionIndexes[0], expressionIndexes[1] - expressionIndexes[0] + 1) + ')';
                let rightExpression = expression.substr(expressionIndexes[1] + 1, expression.length - expressionIndexes[1] - 1);

                expression = leftExpression + expressionWithPow + rightExpression;
                expression = expression.replace('^', ',');
            }
        }

        let factorialIndexes = getIndexesSubstrInStr(expression, '!');
        if (factorialIndexes.length > 0) {
            for (let i = 0; i < factorialIndexes.length; i++) {
                factorialIndexes[i] = expression.indexOf('!');

                expressionIndexes = getIndexesSubexpression(expression, factorialIndexes[i], false);

                let expressionWithFact = expression.substr(expressionIndexes[0], expressionIndexes[1] - expressionIndexes[0]);

                expression = expression.replace(expressionWithFact + '!', factorial(eval(expressionWithFact)));
            }
        }

        let result = eval(expression);

        inputExpression.textContent = input.value + this.dataset.value + result;

        if (isNaN(result) || /[^0-9\.-]/.test(result)) {
            result = '';
        }
        input.value = result;
    }

    input.focus();
});

function addOperationSymbolInInput(event, addedValue = this.dataset.value) {
    let inputValue = input.value;
    let lastInputSymbol = inputValue.length ? inputValue[inputValue.length - 1] : '';

    if (
        !/[(\.]$|^\s*$/.test(inputValue) ||
        (/\($|^\s*$/.test(inputValue) && addedValue === '-')
    ) {
        if (!/[-%\/\*\+]$/.test(inputValue)) {
            input.value += addedValue;
        } else if (
            lastInputSymbol !== addedValue &&
            !/\(+.$|^.{1}$/.test(inputValue)
        ) {
            input.value = inputValue.slice(0, inputValue.length - 1) + addedValue;
        }
    }

    input.focus();
}

function addNumInInput(event, addedValue = this.dataset.value) {
    let inputValue = input.value;
    let lastInputSymbol = inputValue.length ? inputValue[inputValue.length - 1] : '';
    let inputSplit = inputValue.split(/[-%\/\*\+(]/);
    let lastInputSplit = inputSplit[inputSplit.length - 1];
    let isAdd = true;

    if (/^(0(?!\.))?0$/.test(lastInputSplit)) {
        isAdd = false;
    }

    if (/[eπ)!]$/.test(lastInputSplit)) {
        input.value += '*';
    }

    if (!isAdd) {
        input.value = inputValue.slice(0, inputValue.length - 1);
    }

    input.value += addedValue;

    input.focus();
}

function addConstInInput(event, addedValue = this.dataset.value) {
    let inputValue = input.value;
    let lastInputSymbol = inputValue.length ? inputValue[inputValue.length - 1] : '';

    if (lastInputSymbol !== '.') {
        if (/[eπ)!0-9]$/.test(inputValue)) {
            input.value += '*';
        }

        input.value += addedValue;
    }

    input.focus();
}

function factorial(number) {
    let result = 1;
    number = Math.abs(number);

    while (number > 1) {
        result *= number;

        number--;
    }

    return result;
}

function getIndexesSubstrInStr(string, substring) {
    let indexes = [];
    let index = -1;

    for (let i = 0; true; i++) {
        index = string.indexOf(substring, index + 1);

        if (index < 0) {
            break;
        }

        indexes[i] = index;
    }

    return indexes;
}

function getIndexesSubexpression(expression, operationIndex, isLast) {
    let indexes = [0, operationIndex];
    let operations = ['+', '-', '*', '/', '%'];

    if (operationIndex > 0) {
        let amountBrackets = 0;

        for (let i = operationIndex - 1; i >= 0; i--) {
            if (expression[i] === ')') {
                amountBrackets++;
            } else if (expression[i] === '(') {
                amountBrackets--;
            }

            if (
                amountBrackets < 0 ||
                (amountBrackets === 0 && operations.includes(expression[i]))
            ) {
                indexes[0] = i + 1;
                break;
            }

            if (amountBrackets === 0 && i === 0) {
                indexes[0] = i;
            }
        }

        if (isLast) {
            operations = ['+', '-', '*', '/', '%', '^', '!'];
            amountBrackets = 0;
            for (let i = operationIndex + 1; i < expression.length; i++) {
                if (expression[i] === '(') {
                    amountBrackets++;
                } else if (expression[i] === ')') {
                    amountBrackets--;
                }

                if (
                    amountBrackets < 0 ||
                    (amountBrackets === 0 && operations.includes(expression[i]))
                ) {
                    indexes[1] = i - 1;
                    break;
                }

                if (amountBrackets === 0 && i === expression.length - 1) {
                    indexes[1] = i;
                }
            }
        }
    }

    return indexes;
}