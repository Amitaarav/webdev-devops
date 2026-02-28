const fs = require("fs")

const contentsA = fs.readFileSync("./a.txt", "utf-8")
console.log(contentsA)

const contentsB = fs.readFileSync("./b.txt", "utf-8")
console.log(contentsB)

function fileReadCallback(){
    console.log("Inside callback")
    console.log(contentsA)
}

fs.readFile("./c.txt", "utf-8", fileReadCallback)

let s = 0;
for(let i = 0; i < 100; i++) {
    s += i;
}
console.log(s);
