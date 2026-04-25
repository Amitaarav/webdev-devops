// Problem Description – delay(ms, value, callback)
//
// You are required to write a function named delay that takes a time duration
// in milliseconds, a value, and a callback function.
// The function should wait for the given time and then invoke the callback
// with `null` as the first argument and the provided value as the second argument.

function delay(ms, value, callback) {
   setTimeout(() => {
        // INVOKE CALLBACK  
        callback(null, value);
   }, ms);
   //timer ID is returned by setTimeout, but we don't need to return it here as per the problem statement
}
  
module.exports = delay;