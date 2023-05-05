const displayText = document.querySelector(".display-text");
const numberButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-op");
const btnComa = document.querySelector(".btn-coma");

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
    case "equals":
      return () => result;
  }
}

function operate() {
  if (operands.length === 2) {
    result = operation(operands[0], operands[1]);
    operands[0] = result;
    displayText.textContent = result;
    operands.pop();
  }
}

function handleNumBtnClick(event) {
  inputText += event.target.value;
  displayText.textContent = inputText;
}

function handleOperBtnClick(event) {
  if (inputText !== "") {
    operands.push(Number(inputText));
    inputText = "";
  }
  operate();
  operation = selectOperation(event.target);
}

function handleComaBtnClick(event) {
  if (!inputText.includes(".")) inputText += inputText === "" ? "0." : ".";
  displayText.textContent = inputText;
}

numberButtons.forEach((btn) =>
  btn.addEventListener("click", handleNumBtnClick)
);
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", handleOperBtnClick)
);
btnComa.addEventListener("click", handleComaBtnClick);
