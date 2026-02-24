// { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] }

function sumValues(obj){
    var foodSum = obj.food.reduce((a,b) => a + b);
    var travelSum = obj.travel.reduce((a,b) => a + b);
    var billsSum = obj.bills.reduce((a,b) => a + b);

    return{
        food:foodSum,
        travel:travelSum,
        bills:billsSum
    }
}

const obj = { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] };

console.log(sumValues(obj));

// Output: