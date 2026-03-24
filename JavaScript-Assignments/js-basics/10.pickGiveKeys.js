/**
 *  Pick only given keys from object
 * { name: "Rahul", age: 23, city: "Noida" }, ["name","city"]
 * 
 *  { name: "Rahul", city: "Noida" }
 */

const obj = {name: "Rahul", age: 23, city: "Noida"};
const givenKeys = ["name", "city"];
const result = Object.fromEntries(Object.entries(obj).filter(([key]) => {
    return givenKeys.includes(key);
}))

const resultB = givenKeys.reduce((acc, key)=> {
    if(key in obj){
        acc[key] = obj[key]
    }
    return acc
}, {})

console.log(resultB);

/**
 * filter → boolean condition  
map → transformation  
reduce → build result
 */