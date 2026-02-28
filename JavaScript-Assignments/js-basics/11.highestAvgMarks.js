/**
 * { A: [80, 90], B: [70, 75, 85] }

    A
 */

const marks = { A: [80, 90], B: [70, 75, 85] };

function averageMarks(nums){
    const sum = nums.reduce(function(acc, item) {
        return acc + item;
    }, 0)

    return sum / nums.length;
}

function studentWithHighestAvgMarks(marks){
    let result = {name: "", avg: 0};
    const marksArr = Object.entries(marks);
    for(let student of marksArr){
        const score = marksArr[student];
        const avg = averageMarks(score);
        if(avg > result.avg){
            result = {name: student, avg: avg};
        }
    }

    return result.name;
}

console.log(studentWithHighestAvgMarks(marks));

