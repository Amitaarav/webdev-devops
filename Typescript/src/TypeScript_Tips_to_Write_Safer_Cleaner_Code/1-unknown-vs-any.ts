
const fetchSomething: any = () => {
    return "Hi there fetching something";
}

let data: unknown = fetchSomething();

if(typeof data === "string"){
    console.log(data.toUpperCase());
}

if(typeof data === "number"){
    console.log(data.toFixed(2))
}


