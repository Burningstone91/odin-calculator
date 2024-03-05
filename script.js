let num1 = null;
let num2 = null;
let operator;
let prevKeyType = null;
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function remainder(a, b) {
  return a % b;
}

function operate(a, b, operator) {
  if (b === 0 && operator === divide) {
    alert("You just destroyed the universe by dividing by zero!");
    document.querySelector(".all-clear").click();
    return "Error";
  } else {
    result = operator(a, b);
    num1 = result;
    num2 = null;
    return result;
  }
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
        if (result !== "Error") display.value = result + " " + keyValue + " ";
      } else if (prevKeyType !== "operator"){
        display.value += " " + keyValue + " ";
      }
      operatorStringToFunction(keyValue);
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
        if (result !== "Error") display.value = result;
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