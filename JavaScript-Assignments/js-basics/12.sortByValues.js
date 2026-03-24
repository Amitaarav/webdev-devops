/**
 * { a: 3, b: 1, c: 2 }
 * 
 * [["b",1], ["c",2], ["a",3]]
 */

const obj = { a: 3, b: 1, c: 2 };

const result = Object.entries(obj).sort((a, b) => a[1] - b[1])

console.log(Object.fromEntries(result));