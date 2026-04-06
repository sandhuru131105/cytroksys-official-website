// This function takes a string as input and returns the number of words in the string.
function countWords(string) {
  // Split the string into an array of words.
  const words = string.split(' ');

  // Return the number of words in the array.
  return words.length;
}

// Example usage:
const numberOfWords = countWords('This is a sentence with five words.');

console.log(numberOfWords); // 5
