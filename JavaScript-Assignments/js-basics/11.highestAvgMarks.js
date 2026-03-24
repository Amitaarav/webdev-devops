/**
 * { A: [80, 90], B: [70, 75, 85] }

    A
 */

const marks = { A: [80, 90], B: [70, 75, 85] };

const result = Object.entries(marks).reduce((best, [key, arr]) => {
        const sum = arr.reduce((sum, num) => {
            return (sum + num)}, 0
        );

        const avg = sum / arr.length;

        if(avg > best.avg){
            return {key, avg};
        }

        return best;
}, {key: null, avg: -Infinity});

console.log(result.key);

