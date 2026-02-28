/**
 * input : { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] }
    output: { food: 60, travel: 20, bills: 100 }

 */

const obj1 = {
    food: [10,20,30],
    travel: [5, 15],
    bills: [40, 60]
}

/**
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 *  total: required
 *  currentValue: required
 *  currentIndex: optional
 *  arr: optional
 *  initialValue: optional (passed as initial value)
 */
function reduceFunction(total, item){
    return total + item;
}

function sumOfValues(obj){
    let foodValueSum = obj.food.reduce(reduceFunction);
    let travelValueSum = obj.travel.reduce(reduceFunction);
    let billsValueSum = obj.bills.reduce(reduceFunction);
    return {
        food: foodValueSum,
        travel: travelValueSum,
        bills: billsValueSum
    };
}

const value = sumOfValues(obj1)
console.log(value)