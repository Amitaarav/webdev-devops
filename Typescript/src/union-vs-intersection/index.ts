export type Name = { name: string };
export type Age = { age: number };

type Union = Name | Age; // or

type Intersection = Name & Age; // must both

const name = { name: 'Jane'};
const age = { age: 23 };
const nameAndAge = { name: 'Jane', age: 23};

let union: Union;

union = { name: 'Jane'};
union = { age: 23 };
union = { name: 'Jane', age: 23};

// union.age
console.log(union);

let intersection: Intersection;

intersection = nameAndAge;
// intersection = name; // error must be both name and age
// intersection = age; // compiletime error

// 

function filter(union: Union){
    if('name' in union){
        union.name 
    }
    if('age' in union){
        union.age
    }
    if('name' in union && 'age' in union){
        union.name
        union.age
    }
}