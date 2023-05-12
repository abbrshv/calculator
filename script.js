const displayText = document.querySelector(".display-text");
const btnClear = document.querySelector(".btn-clear");
const btnSign = document.querySelector(".btn-sign");
const btnPercent = document.querySelector(".btn-percent");
const btnComa = document.querySelector(".btn-coma");
const numberButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-op");

let inputText;
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

function clear(event) {
  if (inputText === "") {
    operands.length = 0;
    operation = null;
  }
  inputText = "";
  displayText.textContent = "0";
}

function changeSign(event) {
  inputText = -Number(inputText).toString();
  displayText.textContent = inputText;
}

function convertPercent(event) {
  inputText = Number(inputText) / 100;
  displayText.textContent = inputText;
}

function operate() {
  result = operation(operands[0], operands[1]);
  operands[0] = result;
  operands.pop();
  displayText.textContent = result;
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
  if (operands.length === 2) operate();
  operation = selectOperation(event.target);
}

function handleComaBtnClick(event) {
  if (!inputText.includes(".")) inputText += inputText === "" ? "0." : ".";
  displayText.textContent = inputText;
}

clear();
btnClear.addEventListener("click", clear);
btnSign.addEventListener("click", changeSign);
btnPercent.addEventListener("click", convertPercent);
numberButtons.forEach((btn) =>
  btn.addEventListener("click", handleNumBtnClick)
);
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", handleOperBtnClick)
);
btnComa.addEventListener("click", handleComaBtnClick);
