class MyPromise{
    // private
    #state = "pending";
    #value;
    #thenCbs = [];
    #catchCbs = [];

    constructor(callback){
        try {
            callback(this.#resolve, this.#reject)
        } catch (error) {
            this.#reject(error);
        }
    }

    #resolve = () => {}

    #reject = () => {}

    then = (thenCb) => {}

    catch = (catchCbs) => {}
}
function promiseFactory(data, delay, rejectIt){
    return function(){
        return new Promise(function(resolve, reject){
            setTimeout(()=>{
                if(rejectIt){
                    reject("Failed: " + data)
                }else{
                    resolve("Pass: " + data)
                }
            }, delay)
        })
    }
}

const p1 = promiseFactory("p1", 100);
const p2 = promiseFactory("p2", 200);
const p3 = promiseFactory("p3", 1000);
const p4 = promiseFactory("p4", 2000);
const p5 = promiseFactory("p5", 2110);
const p6 = promiseFactory("p6", 3410);

p1()
  .then((data) => {
    console.log(data)
  })
  .then(p2)
  .then((data) => {
    console.log(data)
  })
  .then(p3)
  .then((data) => {
    console.log(data)
  })
  .then(p4)
  .then((data) => {
    console.log(data)
  })
  .then(p5)
  .then((data) => {
    console.log(data)
  })
  .then(p6)
  .then((data) => {
    console.log(data) 
  })
