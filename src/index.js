let result = 0;
let operand = 0;
let operator = "";

// functions
const add = (num1, num2) => parseInt(num1) + parseInt(num2);
const subtract = (num1, num2) => parseInt(num1) - parseInt(num2);
const multiply = (num1, num2) => parseInt(num1) * parseInt(num2);
const divide = (num1, num2) => parseInt(num1) / parseInt(num2);

const show = value => {
  const calcResultEl = document.querySelector(".calc-result");
  calcResultEl.innerHTML = value;
  return;
};

const reset = () => {
  result = 0;
  operand = 0;
  operator = "";
  return;
};

const performBackspace = () => {
  const currentOperand = operand;
  const currentOperandText = currentOperand.toString();

  const newOperandText = currentOperandText.slice(0, -1);
  const newOperand = parseInt(newOperandText);
  operand = newOperand;
};

const performOperation = () => {
  switch (operator) {
    case "%":
      result = divide(result, operand);
      return;
    case "X":
      result = multiply(result, operand);
      return;
    case "-":
      result = subtract(result, operand);
      return;
    case "+":
      result = add(result, operand);
      return;
  }
  return;
};

const setOperand = numberText => {
  const operandText = operand.toString();
  const newOperandText = operandText.concat(numberText);

  operand = parseInt(newOperandText);
};

// Handlers

const handleButtonClick = e => {
  e.stopPropagation();

  const btnContent = e.target.innerText;

  switch (btnContent) {
    case "C":
      reset();
      show(operand);
      return;
    case "<-":
      performBackspace();
      show(operand);
      return;
    default:
      setOperand(btnContent);
      show(operand);
      return;
  }
};

const handleOperatorClick = e => {
  e.stopPropagation();

  if (e.target.innerText != "=") {
    operator = e.target.innerText;
    result = operand;
    operand = 0;
    show(operand);
  } else {
    performOperation();
    show(result);
    operand = result;
  }
  return;
};

// Selectors

document
  .querySelectorAll(".calc-btn:not(.op)")
  .forEach(selector =>
    selector.addEventListener("click", e => handleButtonClick(e))
  );

document
  .querySelectorAll(".op")
  .forEach(selector =>
    selector.addEventListener("click", e => handleOperatorClick(e))
  );
