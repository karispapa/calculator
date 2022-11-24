class Calculator {
  constructor(previousInputValueTextElement, currentInputValueTextElement) {
    this.previousInputValueTextElement = previousInputValueTextElement;
    this.currentInputValueTextElement = currentInputValueTextElement;
    this.clear();
  }

  // methods
  clear() {
    this.currentInput = ''; // clear the current input
    this.previousInput = ''; // clear the previous input
    this.operation = undefined; // clear the current operation value
  }

  delete() {
    this.currentInput = this.currentInput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentInput.includes('.')) return;
    this.currentInput = this.currentInput.toString() + number.toString();
    // this.currentInput = number;
  }

  choseOperation(operation) {
    if (this.currentInput === '') return;
    if (this.previousInput !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousInput = this.currentInput;
    this.currentInput = '';
  }

  compute() {
    let results;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    if (isNaN(prev) || isNaN(current)) return; //

    switch (this.operation) {
      case '+':
        results = prev + current;
        break;
      case '-':
        results = prev - current;
        break;
      case 'x':
        results = prev * current;
        break;
      case '÷':
        results = prev / current;
        break;
      default:
        return;
    }
    if (!Number.isInteger(results)) {
      this.currentInput = results.toFixed(2);
    } else {
      this.currentInput = results;
    }
    this.operation = undefined;
    this.previousInput = '';
  }
  formatNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }

    // const floatNumber = parseFloat(number);
    // if (isNaN(floatNumber)) return '';
    // return floatNumber.toLocaleString('en');
  }

  UpdateDisplay() {
    this.currentInputValueTextElement.innerText = this.formatNumber(
      this.currentInput
    );
    if (this.operation != null) {
      this.previousInputValueTextElement.innerText = `${this.formatNumber(
        this.previousInput
      )} ${this.operation}`;
    } else {
      this.previousInputValueTextElement.innerText = '';
    }
  }
}

const keys = document.querySelector('.keys');

const keyValues = [
  '%',
  'AC',
  'DEL',
  '÷',
  '7',
  '8',
  '9',
  'x',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '+/-',
  '0',
  '.',
  '=',
];
const numberValues = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
const operatorValues = ['%', '÷', 'x', '-', '+'];
const createKeys = () => {
  const rows = 5;
  const cols = 4;
  keys.style.setProperty('--grid-cols', cols);
  keys.style.setProperty('--grid-rows', rows);

  for (let k = 0; k < rows * cols; k++) {
    let key = document.createElement('div');
    keys.appendChild(key);
    key.className = 'key';
    key.innerHTML = keyValues[k];

    if (numberValues.includes(keyValues[k])) {
      key.dataset.number = '';
    } else if (operatorValues.includes(keyValues[k])) {
      key.dataset.operator = '';
    } else {
      key.setAttribute('id', keyValues[k]);
    }

    if (keyValues[k] === '=') {
      key.style.setProperty('background-color', 'rgb(0, 153, 255)');
      key.setAttribute('id', 'equals');
    }
  }
};

createKeys();

const numberKeys = document.querySelectorAll('[data-number]');
const operatorKeys = document.querySelectorAll('[data-operator]');
const equalsKey = document.querySelector('#equals');
const deleteKey = document.querySelector('#DEL');
const clearKey = document.querySelector('#AC');
const currentInputText = document.querySelector('.results');
const previousInputText = document.querySelector('.expression');

const calculator = new Calculator(previousInputText, currentInputText);

// get the input from the number keys
numberKeys.forEach((numberKey) => {
  numberKey.addEventListener('click', () => {
    calculator.appendNumber(numberKey.innerText);
    calculator.UpdateDisplay();
  });
});

// get the input from the operator keys
operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener('click', () => {
    calculator.choseOperation(operatorKey.innerText);
    calculator.UpdateDisplay();
  });
});

equalsKey.addEventListener('click', (key) => {
  calculator.compute();
  calculator.UpdateDisplay();
});

clearKey.addEventListener('click', (key) => {
  calculator.clear();
  calculator.UpdateDisplay();
});

deleteKey.addEventListener('click', (key) => {
  calculator.delete();
  calculator.UpdateDisplay();
});
