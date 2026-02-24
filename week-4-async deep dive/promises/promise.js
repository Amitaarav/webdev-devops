function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}
function callback(){
    console.log("callback executed");
}
/**
 *  callback
 */
// Timers are asynchronous APIs provided by the browser or nodejs
setTimeout(callback, 5 * 1000);

/**
 *  Promisified async function
 */

setTimeoutPromisified(3000).then(callback)
// return an object of promise class

/**
 * class Promise{
 *  then(){
 *  
 *  }
 *  catch(){
 *  }
 * }
 */

let ctr = 0;
for(let i = 0; i < 1000; i++){
    ctr++;
}

console.log(ctr)

/**
 * class Promise{
 * constructor(fn){
 *  
 * }
 * }
 */