// { name: "alice", city: "delhi" }
// { name: "Alice", city: "Delhi" }

const obj = { name: "alice", city: "delhi" };

const result = Object.entries(obj).reduce((acc,[key, value]) => {
    acc[key] = value.charAt(0).toUpperCase() + value.slice(1);
    return acc;
}, {});

console.log(result);