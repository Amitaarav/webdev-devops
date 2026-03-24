/**
 *  { A: [80, 90], B: [70, 75, 85] }
 * 
 *  A
 */

const obj = { A: [80, 90], B: [70, 75, 85] };

const result = Object.entries(obj).reduce((best, [key, arr])=>{
    const avg = arr.reduce((sum, num) => {
        return (sum + num)/ arr.length;
    });

    if(avg > best[key]){
        return {key, avg};
    }

    return best;
}, {key: null, avg: -Infinity});

console.log(result);