function sum(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function doArithmetic(a, b, whatToDo){
    return whatToDo(a, b);
}

const ans1 = doArithmetic(1, 3, sum);
const ans2 = doArithmetic(21, 12, sub);

console.log(ans1);
console.log(ans2);

