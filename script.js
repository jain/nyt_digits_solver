// Get form element
const mathForm = document.getElementById('mathForm');

// Add submit event listener
mathForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get input values
  const num1 = parseInt(document.getElementById('num1').value);
  const num2 = parseInt(document.getElementById('num2').value);
  const num3 = parseInt(document.getElementById('num3').value);
  const num4 = parseInt(document.getElementById('num4').value);
  const num5 = parseInt(document.getElementById('num5').value);
  const num6 = parseInt(document.getElementById('num6').value);
  const expectedAnswer = parseInt(document.getElementById('expectedAnswer').value);

  let digits = [num1, num2, num3, num4, num5, num6];

  let solution = 'jlkjalkjdklajsdkljaslkdjaslkdjlaksjdlkasjdlkajsdlkjsdlkjaslkdjalskdjlajsdlkjasdlkjasjalksdj';

  // Perform DFS to find solution
  const result = solve(digits, expectedAnswer, '', new Set(), 0, solution);

  // Display result
  const resultElement = document.getElementById('result');
  if (result === null) {
    resultElement.textContent = 'No solution found.';
  } else {
    resultElement.textContent = 'Solution: ' + result;
  }
});


function checkNum(num) {
  if (num <= 0) {
    return false;
  }
  if (!Number.isInteger(num)) {
    return false;
  }
  return true;
}

function solve(digits, goal, sofar, visited, counter, sol) {
  let curr = JSON.stringify(digits.sort());
  if (visited.has(curr)) {
    return sol;
  }
  counter++;
  for (let digit of digits) {
    if (digit == goal) {
      console.log(sofar);
      if (sofar.length < sol.length) {
        sol = sofar;
      }
      return sol;
    }
  }
  if (digits.length < 2) {
    return sol;
  }
  for (let i = 0; i < digits.length; i++) {
    for (let j = i+1; j < digits.length; j++) {
      let newDigitsBase = digits.slice(0, i).concat(digits.slice(i+1, j), digits.slice(j+1));
      let num = digits[i] + digits[j];
      if (checkNum(num)) {
        let newDigits = newDigitsBase.concat(num);
        let sol1 = solve(newDigits, goal, sofar + ',' + digits[i] + '+' + digits[j], visited, counter, sol);
        if (sol1.length < sol.length) {
            sol = sol1;
        }
      }
      num = digits[i] - digits[j];
      if (checkNum(num)) {
        let newDigits = newDigitsBase.concat(num);
        let sol1 = solve(newDigits, goal, sofar + ',' + digits[i] + '-' + digits[j], visited, counter, sol);
        if (sol1.length < sol.length) {
            sol = sol1;
        }
      }
      num = digits[i] * digits[j];
      if (checkNum(num)) {
        let newDigits = newDigitsBase.concat(num);
        let sol1 = solve(newDigits, goal, sofar + ',' + digits[i] + '*' + digits[j], visited, counter, sol);
        if (sol1.length < sol.length) {
            sol = sol1;
        }
      }
      num = digits[i] / digits[j];
      if (checkNum(num)) {
        let newDigits = newDigitsBase.concat(num);
        let sol1 = solve(newDigits, goal, sofar + ',' + digits[i] + '/' + digits[j], visited, counter, sol);
        if (sol1.length < sol.length) {
            sol = sol1;
        }
      }
    }
  }
  visited.add(curr);
  return sol;
}