myFunc();

var myFunc = () => {
    console.log("One");
};

myFunc();

function myFunc() {
    console.log("Two");
}

var x = 10;

function test(){
    console.log("x: ",x);
    var x = 20;
}

test();

function foo(){
    console.log("A")
}

var foo  = 10;

function foo(){
    console.log("B")
}

// If multiple functions have the same name → last one wins

foo();