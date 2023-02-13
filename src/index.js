module.exports = function check(str, bracketsConfig) {
  const OPEN_BRACKETS = [];
  const BRACKETS_IDENTICAL = [];
  const BRACKETS_PAIR = {};
  let stack = [];

  for (const brackets of bracketsConfig) {
    if (brackets[0] === brackets[1]) {
      BRACKETS_IDENTICAL.push(brackets[0]);
    }
    OPEN_BRACKETS.push(brackets[0]);
    BRACKETS_PAIR[brackets[1]] = brackets[0];
  }

  for (let i = 0; i < str.length; i += 1) {
    let currentSymbol = str[i];
    let temp = stack[stack.length - 1];

    if (OPEN_BRACKETS.includes(currentSymbol) && !BRACKETS_IDENTICAL.includes(currentSymbol)) {
      stack.push(currentSymbol);
    } else if (OPEN_BRACKETS.includes(currentSymbol) && BRACKETS_IDENTICAL.includes(currentSymbol)) {
      if (currentSymbol !== temp) {
        stack.push(currentSymbol);
      } else if (currentSymbol === temp) {
        stack.pop();
      }
    } else {
      if (stack.length === 0) {
        return false;
      }
      let topElement = stack[stack.length - 1];

      if (BRACKETS_PAIR[currentSymbol] === topElement) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
