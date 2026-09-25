type Species = "cat" | "dog";

interface Pet {
    species: Species;
    name: string;
}

class Cat implements Pet {
    species: Species = "cat";
    name: string;

    constructor(name: string){
        this.name = name
    }

    purr(): void {
        console.log(`${this.name} purrs softly...`)
    }
}

class Dog implements Pet {
    species: Species = "dog";
    name: string;

    constructor(name: string){
        this.name = name
    }

    fetch(): void {
        console.log(`${this.name} fetches ball...`)
    }
}

function isCat(pet: Pet): pet is Cat {
    return pet.species  === "cat"
}

function isDog(pet: Pet): pet is Dog {
    return pet.species === "dog"
}

function interact(pet: Pet){
    if(isCat(pet)){
        pet.purr()
    }else if(isDog(pet)){
        pet.fetch()
    }
}

let pets: Pet[] = [
    new Cat("Kitty"),
    new Dog("Doggi"),
    new Cat("Tom"),
    new Dog("Bruno")
]

const cats = pets.filter(isCat);

cats.forEach(cat => {
    cat.purr()
})


// 
interface ApiSuccess {
    status: "ok";
    data: ProductResponse;
}
interface ApiError {
    status: "error";
    message: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
}

interface ProductResponse{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

type ApiResponse = ApiSuccess | ApiError;

function isSuccess(res: ApiResponse): res is ApiSuccess{
    return res.status === "ok";
}


const response = await fetchData();

if(isSuccess(response)){
    console.log(response.data.products);
}else{
    console.log(response.message)
}

async function fetchJson<T>(url: string):Promise<T>{
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`HTTP ${response.status}`)
    }

    return await response.json() as T;
}

async function fetchData(): Promise<ApiResponse>{
    try {

        const data = await fetchJson<ProductResponse>("https://dummyjson.com/products");
        return {
            status: "ok",
            data
        };
    } catch (error) {
        return {
            status: "error",
            message: "Network error while fetching data"
        }
    }
}