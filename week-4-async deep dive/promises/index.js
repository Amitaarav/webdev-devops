const fs = require("fs")

function afterFileIsRead(err, contents){
    if(err){
        console.log("Error while reading the file", err)
    
    } else {
        console.log("File contents: ", contents)
    }
}

// fs.readFile("a.txt", "utf-8", afterFileIsRead);

/**
 * Convert fs to promisified version
 */

function readFilePromisified(filePath, encoding, callback){
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, encoding, (err, data)=>{
            if(err){
                reject(err);
            }else{
                setTimeout(()=>{
                    resolve(data);
                }, 500)
                
            }
        })
    })
}

/**
 * Success callback and error callback
 */
function callback(contents){
    console.log("File read successfully: ", contents);
}

function errorCallback(err){
    console.log("Error while reading the file", err);
}

let p = readFilePromisified("a.txt", "utf-8");
p.then(callback).catch(errorCallback);

setTimeout(()=>{
    console.log(p)
}, 100)

console.log(p)
