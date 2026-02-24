// ["apple", "banana", "apple", "orange", "banana", "apple"]


// Count word occurrences in array
function countWords(words){
    var word = {
    }
    for (var i = 0; i < words.length; i++) {
        if(word[words[i]] === undefined){
            word[words[i]] = 1;
        }
        else{
            word[words[i]]++;
        }
        
    }
    return word;
}

console.log(countWords(["apple", "banana", "apple", "orange", "banana", "apple"]));

