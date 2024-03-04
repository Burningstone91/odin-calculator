let num1 = 0;
let num2 = 0;
let operator;


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

console.log(operate(num1, num2, add));
console.log(operate(num1, num2, subtract));
console.log(operate(num1, num2, multiply));
console.log(operate(num1, num2, divide));