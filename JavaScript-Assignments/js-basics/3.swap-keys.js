/**
 *
input: { a: "x", b: "y", c: "z" }

output: { x: "a", y: "b", z: "c" }

 */

const obj = { a: "x", b: "y", c: "z" };

// swap keys


const invertedA = {};

for(let key in obj){
    let val = obj[key]; // 
    invertedA[val] = key;
}

console.log("for...in: ", invertedA);

const inverted = {};

const invertedB = Object.keys(obj).forEach(key => {
    inverted[obj[key]] = key;
});

console.log("invertedB: ",inverted);

const invertedC = Object.entries(obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

console.log("invertedC: ",invertedC)

/**
 *  1. Object.entries(obj) → [["a", "x"], ["b", "y"], ["c", "z"]]
 *  2. reduce() builds a new object
 *  3. Swap [key, value] -> acc[value] = key
 */

const objA = {
  a: "x",
  b: {
    c: "y",
    d: {
      e: "z"
    }
  }
};

function invertedDeep(obj, path = "", result = {}){

    for(let key in obj){
        const value = obj[key];
        const newPath = path ? `${path}.${key}`: key;

        if(typeof value === "object" && value !== null){
            invertedDeep(value, newPath, result);
        } else{
            result[value] = newPath;
        }
    }
    return result;
}

console.log("Inverted Deep: ",invertedDeep(objA))

/**
 *  1. Traverse object recursively
 *  2. Track path (b.d.e)
 *  3. Assign value -> path
 */