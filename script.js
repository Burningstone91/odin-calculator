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

function operatorStringToFunction(operatorString) {
  switch (operatorString) {
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
      } else if (prevKeyType !== "operator"){
        operatorStringToFunction(keyValue);
        display.value += " " + keyValue + " ";
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


    if (keyType === "equal") {
      if (num1 === null || num2 === null || operator === null){
        alert("You are missing a number or an operator!")
      } else {
        result = operate(Number(num1), Number(num2), operator);
        display.value = result;
        num1 = result;
        num2 = null;
      }
    }


    if (keyType === "decimal") {
      if (num2 === null && prevKeyType !== "operator" && !num1.includes(".")) {
        display.value += keyValue;
        num1 += keyValue;
      } else if (num2 !== null && !num2.includes(".")) {
        display.value += keyValue;
        num2 += keyValue;
      }
    }


    if (keyType === "clear") {
      if (display.value.slice(-1) === " ") {
        display.value = display.value.substring(0, display.value.length - 3);
      } else if (num2 === null) {
        num1 = num1.slice(0, -1);
        display.value = display.value.slice(0, -1);
      } else if (num1 !== null) {
        num2 = num2.slice(0, -1);
        display.value = display.value.slice(0, -1);
      }
      prevKeyType = "clear";
    }

  })
})

// Keyboard support
document.addEventListener("keydown", function handleKeyPress(event) {
  const getOperator = {
    "%": "remainder",
    "/": "divide",
    "+": "add",
    "-": "subtract",
    "*": "multiply"
  }

  if (!isNaN(event.key) && event.key !== " ") {
    document.querySelector("#digit-" + event.key).click();
  }
  if (event.key in getOperator) {
    document.querySelector("#" + getOperator[event.key]).click();
  }
  if (event.key === "=" || event.key === "Enter") {
    document.querySelector(".equal").click();
  }
  if (event.key === ".") {
    document.querySelector(".decimal").click();
  }
  if (event.key === "Backspace") {
    document.querySelector(".clear").click();
  }
})


//error message when dividing by zero
//long decimals