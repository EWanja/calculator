let firstOperand = null;
let operator = null;
let currentInput = '';  // Current number input
let lastOperatorPressed = false;
let hasDecimal = false; 

//Basic maths functions
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
    if (b === 0) {
      return 'Error: Cannot divide by zero';
    }
    return a / b;
  }

  function operate(operator, a, b) {
    switch (operator) {
      case '+':
        return add(a, b);
      case '-':
        return subtract(a, b);
      case '*':
        return multiply(a, b);
      case '/':
        return divide(a, b);
      default:
        return 'Error: Invalid operator';
    }
  }

  //Display Function
  function updateDisplay() {
    document.getElementById('display').value = currentInput;
  }

//append number to display
  function appendToDisplay(value) {
    if (currentInput === 'Error: Cannot divide by zero') {
        currentInput = value; 
    } else {
        currentInput += value; 
    }
    updateDisplay();       
  }
  
  
  //operator function
  function setOperator(op) {
  if (currentInput === '') return; // Don't proceed if no number is typed
  if (lastOperatorPressed) {
    operator = op;
    return;  // Update the operator, don't calculate
}

  firstOperand = parseFloat(currentInput); // Save first number
  operator = op;                           // Save the operator
  currentInput = '';                       // Clear input for second number
  updateDisplay();     
  lastOperatorPressed = true;                    
}

//Calculate Function
function calculate() {
    if (currentInput === '') return; // Don't calculate if no second number
  
    let secondOperand = parseFloat(currentInput); // Get the second number
    let result;
  
    // Perform the calculation based on the operator
    switch (operator) {
      case '+':
        result = add(firstOperand, secondOperand); // Use the add function
        break;
      case '-':
        result = subtract(firstOperand, secondOperand); // Use subtract function
        break;
      case '*':
        result = multiply(firstOperand, secondOperand); // Use multiply function
        break;
      case '/':
        result = divide(firstOperand, secondOperand); // Use divide function
        break;
      default:
        return; // If no operator, do nothing
    }
    //round result to 2 decimal place
    result = result.toFixed(2);

    // Show the result and reset everything for the next operation
    currentInput = result.toString();  
    firstOperand = null;               
    lastOperatorPressed = false;               
    updateDisplay();                   
  }

  //Clear button function
  function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    lastOperatorPressed = false;
    hasDecimal = false;  // Reset the decimal flag
    updateDisplay();
}

// Decimal button functionality
function appendDecimal() {
    if (!hasDecimal) {
        currentInput += '.';
        hasDecimal = true;
        updateDisplay();
    }
}

// Backspace functionality
function backspace() {
    currentInput = currentInput.slice(0, -1);  // Remove last character
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);  // Append the number
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        setOperator(event.key);  // Set the operator
    } else if (event.key === 'Enter') {
        calculate();  // Perform calculation on enter
    } else if (event.key === 'Backspace') {
        backspace();  // Backspace functionality
    }
    else if (event.key.toLowerCase() === 'c') {
      clearDisplay();
  }
  else if (event.key === '.') {
    appendDecimal();
}
});

