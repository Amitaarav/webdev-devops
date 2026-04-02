// Problem Description – callbackify(fn)
//
// You are required to write a function named callbackify that takes a function
// which returns a Promise.
// The function should return a new function that accepts a callback as its
// last argument.
// When the Promise resolves, the callback should be called with `(null, data)`.
// When the Promise rejects, the callback should be called with the error.


function callbackify(fn) {
    // returns a Promise  functions
    /**
     * return function(...arg, callback)
     */
    return function(...args){
        const callback = args.pop(); // last argument is callback
        fn(...args)
        .then(data => callback(null, data))
        .catch(error => callback(error));
    }

}

module.exports = callbackify;


// Higher Order Functions
// A function that: 1. takes a function OR 2. return a function

