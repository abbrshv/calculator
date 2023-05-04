const displayText = document.querySelector(".display-text");
const numberButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-op");
const btnComa = document.querySelector(".btn-coma");
const btnEquals = document.querySelector(".btn-equals");

let inputText = "";
displayText.textContent = "0";
let operands = [];
let operation;
let result = 0;

function selectOperation(button) {
  switch (button.value) {
    case "div":
      return (a, b) => a / b;
    case "mult":
      return (a, b) => a * b;
    case "plus":
      return (a, b) => a + b;
    case "minus":
      return (a, b) => a - b;
  }
}

function operate() {
  if (inputText !== "") {
    operands.push(Number(inputText));
  }
  if (operands.length === 2) {
    result = operation(operands[0], operands[1]);
    operands.length = 2;
    operands[0] = result;
    if (result === Infinity) {
      result = "Error";
      operands.length = 0;
    }
    displayText.textContent = result;
  }
  inputText = "";
}

function handleNumBtnClick(event) {
  inputText += event.target.value;
  displayText.textContent = inputText;
}

function handleOperBtnClick(event) {
  if (operands.length === 2) {
    operands.pop();
  }
  operation = selectOperation(event.target);
  operate();
}

function handleComaBtnClick(event) {
  if (!inputText.includes(".")) {
    inputText += ".";
  }
  displayText.textContent = inputText;
}

function handleEqualsBtnClick(event) {
  operate();
}

numberButtons.forEach((btn) =>
  btn.addEventListener("click", handleNumBtnClick)
);
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", handleOperBtnClick)
);
btnEquals.addEventListener("click", handleEqualsBtnClick);
btnComa.addEventListener("click", handleComaBtnClick);
