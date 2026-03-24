/**
 * input : { a: 10, b: 50, c: 20 }
 */

const obj = { a: 10, b: 50, c: 20 };

let largestValue = -Infinity;
let result = null;
for(let key in obj){
    if(obj[key] > largestValue){
        largestValue = obj[key];
        result = key;
    }
}

const resultB = Object.entries(obj).reduce(
    (maxKey, [key, value]) => {
        return value > obj[maxKey] ? key : maxKey
    }, 
    Object.keys(obj)[0]
)

//return a, b;  // returns b only

const resultKey = Object.entries(obj).reduce(
  (maxKey, [key, value]) =>
    value > obj[maxKey] ? key : maxKey,
  Object.keys(obj)[0]
);
/**
 * iter: 1
 *  maxKey = "a"
 * [key, value] = ["a", 10]
 * 
 * compare:
 * 10 > obj["a"](10) -- no, keep "a"
 * 
 * iter: 2
 * maxKey = "a",
 * [key, value] = ["b", 50]
 * 
 * compare:
 * 20 > obj["a"](10) -- yes update maxKey = "b"
 * 
 * iter: 3
 * maxKey = "b"
 * [key, value] = ["c", 20]
 * 
 * compare:
 * 20 > obj["c"](50) --no, keep "b"
 * 
 * final
 * maxKey = "b"l
 */

console.log(resultKey);

console.log(resultB);

