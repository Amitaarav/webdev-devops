function task(message){
    let n = 1000000000;
    while(n > 0){
        n--;
    }
    console.log(message);
}
console.log('Start Script...');

setTimeout(()=>{
    task('Call an API');
}, 1000);

console.log('Done!');
//more precise to say that the JavaScript runtime can do one thing at a time.