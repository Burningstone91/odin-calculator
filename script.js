let num1 = null;
let num2 = null;
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

function remainder(num1, num2) {
  return num1 % num2;
}

function operate(num1, num2, operator) {
  return operator(num1, num2)
}


buttons.forEach(button => {
  button.addEventListener("click", function handleClick(event) {
    const key = event.target;
    const keyValue = key.textContent;
    const keyType = key.className;


    if (keyType === "digit") {
      if (prevKeyType === null){
        num1 = keyValue;
      } else if (prevKeyType === "operator") {
        num2 = keyValue;
      } else if (prevKeyType === "digit") {
        if (num2 === null) {
          num1 += keyValue;
        } else {
          num2 += keyValue;
        }
      }
      
      display.value === "0" ? display.value = keyValue : display.value += keyValue;
      prevKeyType = "digit";
    }


    if (keyType === "operator") {
      if (num2 !== null) {
        result = operate(Number(num1), Number(num2), operator);
        display.value = result + " " + keyValue + " ";
        num1 = result;
        num2 = null;
      } else {
        // Remove operator if previous button was an operator
        if (prevKeyType === "operator") {
          display.value = display.value.substring(0, display.value.length - 3);
        }

        display.value += " " + keyValue + " ";
      }

      switch (keyValue) {
        case "%":
          operator = remainder;
          break;
        case "÷":
          operator = divide;
          break;
        case "+":
          operator = add;
          break;
        case "-":
          operator = subtract;
          break;
        case "x":
          operator = multiply;
          break;
        }

      prevKeyType = "operator";
    }

    if (keyType === "all-clear") {
      prevKeyType = null;
      operator = null;
      num1 = null;
      num2 = null;
      display.value = 0;
    }
  })
})
