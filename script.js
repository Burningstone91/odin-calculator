let num1 = 0;
let num2 = 0;
let operator;
let prevKeyType = null;
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  return operator(num1, num2)
}

num1 = 50;
num2 = 5;

buttons.forEach(button => {
  button.addEventListener("click", function handleClick(event) {
    const key = event.target;
    const keyValue = key.textContent;
    const keyType = key.className;

    if (keyType === "digit") {
      if (prevKeyType === "digit" || prevKeyType === null) {
        if (display.value == "0") {
          display.value = keyValue;
        } else {
          display.value += keyValue;
        }
      }
    }


    if (prevKeyType === "digit") {

    }

  })
})