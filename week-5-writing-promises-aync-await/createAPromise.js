// create a promisified version of fs.readFile
// create a promisified version of setTimeout
// create a promisified version of fs.writeFile
const fs = require("fs")
function fsReadFilePromise(fileName, encoding){
    return new Promise(function(resolve, reject) {
        // write the logic
        fs.readFile(fileName,encoding, function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
}

fsReadFilePromise("a.txt", "utf-8")
.then(function(data){
    // on resolve with value
    console.log("File content: ", data);
})
.catch(function(err){
    // on reject with value of error
    console.log("Error while reading the file: ", err);
})


// create a promisified version of setTimeout

// without promises
setTimeout(function(){
    console.log("2 seconds have passed");
}, 2000)


function setTimeoutPromise(delay){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve();
        }, delay)
    })
}

setTimeoutPromise(2000)
.then(function(){
    console.log("2 seconds have passed");
})
.catch(function(){
    console.log("Error while waiting for the timeout");
})
.finally(function(){
    console.log("This will be executed regardless of the promise being resolved or rejected");
})

// create a promisified version of fs.writeFile

// without promises
fs.writeFile("c.txt", "This is the content of c.txt", function(err){
    if(err){
        console.log("Error while writing to the file: ", err);
    }
    console.log("File written successfully");
})

function fsWriteFilePromise(fileName, content){
    return new Promise(function(resolve, reject){
        fs.writeFile(fileName, content, function(err, data){
            if(err){
                reject(err);
            }else{     
                resolve(data);
            }   
        })
    })
}

fsWriteFilePromise("b.txt", "This is the content of b.txt")
.then(function(data){
    console.log("File written successfully");
})
.catch(function(err){
    console.log("Error while writing to the file: ", err);
})

// can not resolve or reject a promise more than once
const p = new Promise(function(resolve, reject){
    resolve("First resolve");
    resolve("Second resolve");
    reject("First reject");
    reject("Second reject");
})
p.then(function(value){
    console.log("Promise resolved with value: ", value);
})
.catch(function(err){
    console.log("Promise rejected with error: ", err);
})


// 

async function main(){
    // fsReadFilePromise("a.txt", "utf-8")
    // .then(function(data){
    //     console.log(data);
    //     fsReadFilePromise("b.txt", "utf-8")
    //     .then(function(data){
    //         console.log(data);
    //         fsReadFilePromise("c.txt", "utf-8"
    //             .then(function(data){
    //                 console.log(data);
    //             })
    //         )
    //     })
    // })

    // let fileAContent = fs.readFileSync("a.txt", "utf-8"); // 10 seconds to read the file : block the main thread for 10 seconds
    // let fileBContent = fs.readFileSync("b.txt", "utf-8"); //
    // let fileCContent = fs.readFileSync("c.txt", "utf-8");

    let fileAContent = await fsReadFilePromise("a.txt", "utf-8");
    let fileBContent = await fsReadFilePromise("b.txt", "utf-8");
    let fileCContent = await fsReadFilePromise("c.txt", "utf-8");

    console.log("File A content:",fileAContent);
    console.log("File B content:",fileBContent);
    console.log("File C content:",fileCContent);
}

main();