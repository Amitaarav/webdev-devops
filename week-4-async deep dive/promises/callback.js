setTimeout(function(){
    console.log('Hi');
    setTimeout(function(){
        console.log('Hello')
        setTimeout(function(){
            console.log('Hello there')
        }, 5000)
    }, 3000)
}, 1000)



function step3Done() {
  console.log("hello there");
}

function step2Done() {
  console.log("hello");
  setTimeout(step3Done, 5000);
}

function step1Done() {
  console.log("hi");
  setTimeout(step2Done, 3000);
}

setTimeout(step1Done, 1000);

/**
 * Promisified version
 */

function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeoutPromisified(1000).then(function(){
    console.log("Hi")
    setTimeoutPromisified(3000).then(function(){
        console.log("Hello")
        setTimeoutPromisified(5000).then(function(){
            console.log("Hello there")
        })
    })
})