 function pyramid(pattern, rows, isDownwards) {
  let result = '\n';  

  if (!isDownwards) {
    
    for (let i = 1; i <= rows; i++) {
      let numPatternChars = 2 * i - 1;
      let numSpaces = rows - i; 
      result += ' '.repeat(numSpaces) + pattern.repeat(numPatternChars) + '\n';
    }
  } else {
    
    for (let i = rows; i >= 1; i--) {
      let numPatternChars = 2 * i - 1;  
      let numSpaces = rows - i;
      result += ' '.repeat(numSpaces) + pattern.repeat(numPatternChars) + '\n';
    }
  }

  return result;
}
