/**
 * Input: { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] }
   Output: ["apple", "banana", "carrot", "pea"]
 */

const obj = { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] };

let flattenARR = {};

flattenARR = Object.values(obj).flat();
// .flat merge into one array
console.log(flattenARR);

const flattenArrB = Object.values(obj).reduce((acc, curr) => {
    return acc.concat(curr);
});
console.log(flattenArrB);

const flattenARRC = [].concat(...Object.values(obj));

console.log(flattenARRC);