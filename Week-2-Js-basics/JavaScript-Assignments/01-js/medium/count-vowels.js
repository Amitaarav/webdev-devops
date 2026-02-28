/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    let count = 0;
    const lowercase = str.toLowerCase();
    for(let i = 0; i < lowercase.length; i++) {
        if(lowercase[i] === 'a' || lowercase[i] === 'e' || lowercase[i] === 'i' || lowercase[i] === 'o' || lowercase[i] === 'u') {
            count++;
        }
    }
    return count;
}

module.exports = countVowels;