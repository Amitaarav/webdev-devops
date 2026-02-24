const fs = require("fs")
// let data = fs.readFileSync("a.txt", "utf-8")

// eventual result of an asynchronous operation
// 

// fs.readFile("a.txt", "utf-8", (err, data)=>{
//     if(err){
//         console.log("Error while reading the file", err)
//     } else {
//         console.log("File contents: ", data)
//     }
// })

const p = new Promise((resolve, reject) => {
    // fs.readFile("a.txt", "utf-8", (err, data)=>{
    //     if(err){
    //         reject(err)
    //     } else {
    //         resolve(data)
    //     }
    // })

    resolve
})
console.log(p)