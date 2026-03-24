/**
 * { x: [1,2,3], y: [2,3,4], z: [4,5] }
 * 
 * [1,2,3,4,5]
 */

const obj = { x: [1,2,3], y: [2,3,4], z: [4,5] };

const result = Object.values(obj).flat();

const uniqueValues = [...new Set(result)];

console.log(uniqueValues);