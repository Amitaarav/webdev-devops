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

// create a promisified version of fs.writeFile

// without promises
fs.writeFile("b.txt", "This is the content of b.txt", function(err){
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