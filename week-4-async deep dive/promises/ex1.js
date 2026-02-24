console.log(`1: script starts`)

setTimeout(()=>{
    console.log(`2: Timeout (macrotask) callback executed`)
}, 0)

Promise.resolve().then(()=>{
    console.log(`3: Promise (Microtask)`)
})
console.log(`4: script ends`)