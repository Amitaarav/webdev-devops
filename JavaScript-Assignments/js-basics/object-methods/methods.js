const obj = { a: 1, b: 2 };

const A = Object.keys(obj); 
console.log(A)

const B = Object.values(obj);
console.log(B)

const C = Object.entries(obj);
console.log(C)

const D = Object.entries(obj).map(([key, value]) => {
    return key + value;
});
console.log(D)

const arr = [["a", 1], ["b", 2]];

const E = Object.fromEntries(arr);

console.log(E);
// { a: 1, b: 2 }

const swapped = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
)

console.log(swapped)

const obj1 = { a : 1};
const obj2 = { b : 2 };

const newObj = Object.assign({}, obj1, obj2);
console.log(newObj)

const merged = { ...obj1, ...obj2 };
console.log(merged) //prefered over assign

// freeze  makes object immutable

const A1 = { a: 1};

Object.freeze(A1);
// obj.a = 10;

console.log(A1)

// can modify existing, but can not add or remove
Object.seal(A1);
obj.a = 2;
//Obj.b = 3;

console.log(A1);

console.log(A1.hasOwnProperty("a"));

// modern
console.log(Object.hasOwn(A1, "a"));

// Checks in prototype chain too
console.log("a" in A1)
