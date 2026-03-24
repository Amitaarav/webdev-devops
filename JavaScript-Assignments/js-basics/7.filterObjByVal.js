/**
 *  { a: 20, b: 60, c: 40, d: 90 }
 * 
 *  { b: 60, d: 90 }
 */

const obj = { a: 20, b: 60, c: 40, d: 90};

const result =Object.fromEntries(Object.entries(obj).filter(([key, value]) => value > 50));

console.log(result);

// reduce based 
const resultA = Object.entries(obj).reduce((acc, [key, value]) => {
    if(value > 50){
        acc[key] = value;
    }
    return acc;
}, {});

console.log(resultA)

//Why reduce() is powerful:
// Gives full control over transformation
// Can build arrays, objects, sums, maps, anything
// Often used in real-world data processing

// Why reduce() is powerful:
// Gives full control over transformation
// Can build arrays, objects, sums, maps, anything
// Often used in real-world data processing

const resultB = Object.entries(obj).reduce((acc, [key, value])=>{
    if(value > 50){
        acc[key] = value * 2;
    }
    return acc;
}, {}) // [[a, 20], [b, 60], [c, 40], [d, 90]]
console.log(resultB);

// Object --> Array of keys
const resultC = Object.entries(obj).reduce((acc, [key, value])=>{
    if(value > 50){
        acc.push(key);
    }
    return acc;
}, []) ;
console.log(resultC);

// Group keys based on even/odd values
const objA = { a: 21, b: 60, c: 43, d: 90 };

const resultD = Object.entries(objA).reduce((acc, [key, value]) =>{
    const type = value % 2 === 0 ? "even" : "odd";

    if(!acc[type]) acc[type] = [];
    acc[type].push(value);

    return acc;
}, {});

console.log(resultD);

const objC = {
  a: 20,
  b: { x: 70, y: 10 },
  c: 40,
  d: { p: 90, q: 30 }
};

