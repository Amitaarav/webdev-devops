// Problem Description – fetchWithTimeout(url, ms, callback)
//
// You are required to write a function named fetchWithTimeout that accepts a URL,
// a time limit in milliseconds, and a callback function.

// The function attempts to fetch data from the given URL.

// If the request completes within the specified time, the callback is invoked with
// null as the first argument and the fetched data as the second argument.

// If the operation exceeds the time limit, the callback is invoked with an Error
// whose message is "Request Timed Out".


function fetchWithTimeout(url, ms, callback) {

    if(typeof callback !== "function"){
        throw new Error("callback must be a function")
    }
    
     let isDone = false;

     const timer = setTimeout(() => {
        if(isDone) return;
        isDone = true;
        callback(new Error("Request Timed Out"));
     }, ms)

     fetch(url, (err, data) => {
        if(isDone) return;

        isDone = true;
        clearTimeout(timer); // clear the timer if fetch completes in time

        if(err){
            callback(err);
        }else{
            callback(null, data);
        }
     })
}

module.exports = fetchWithTimeout;

/**
 * fetch can be
 * 1. Promise-based (browser / node v18+)
 * 2. callback-based (mock/test environment)
 */
