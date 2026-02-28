/**
 * input: ["apple", "banana", "apple", "orange", "banana", "apple"]
 * output:{ apple: 3, banana: 2, orange: 1 }

 */
const words = ["apple", "banana", "apple", "orange", "banana", "apple", "apple", "orange", "banana"];

function coundWords(words){
    const result = {} // object to store the frequency of the occuring words
    for(let word of words){
        // 1. result[word] === undefined ? result[word] = 1 : result[word]++;
        result[word] = (result[word] || 0) + 1; // if result[word] exist then result[word] += 1 else 0 + 1  
    }

    // using reduce
    return words.reduce(function(acc, word){
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    },{}) // giving initial value as emplty object in reduce function

    // return result;
}

function sortByFrequency(words){
    const freq = {};

    for(let word of words){
        freq[word] = (freq[word] || 0) + 1;
    }

    const objToArray = Object.entries(freq);
    // descending order
    const sortedFreq = objToArray.sort((a,b)=>{
        a[1] - b[1];
    })

    // sorted words
    const sortedWords = sortedFreq.map(item => item[0])

    // ascending order sort
    
    return sortedWords;
}


console.log(sortByFrequency(words));

function mostFrequentWords(words){
    let maxCount = 0;
    let maxCountWord = "";
    const freqArr = Object.entries(coundWords(words));
    for(let word of freqArr){
        if(word[1] > maxCount){
            maxCount = word[1];
            maxCountWord = word[0];
        }
    }
    return maxCountWord;
}

console.log(mostFrequentWords(words));


// top k elements

function topKFrequent(words,k){
    const freqArr = Object.entries(coundWords(words));
    return freqArr.sort((a,b)=> b[1] - b[1])
    .slice(0,k)
    .map(item=>item[0])
}

console.log(topKFrequent(words,2))


// count words using map

function countWordsUsingMap(words){
    const map = new Map;
    for(let word of words){
        map.set(word, (map.get(word) || 0) + 1);
    }
    return map;
}

console.log(countWordsUsingMap(words))