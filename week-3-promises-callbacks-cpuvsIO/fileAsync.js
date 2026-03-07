const fs = require("fs");

function fileReadCallback(err, contents){
    console.log(contents);
}
fs.readFile("a.txt", "utf-8", fileReadCallback);

let s = 0;
for(let i = 0; i < 100; i++){
    s += i;
}
console.log(s);

//
let ctr = 0;
function callback(){
    console.log(ctr)
    ctr++;
}

//setInterval(callback, 1000);

for(let i = 0 ;i < 100 ;i++){
    console.log(i)
}