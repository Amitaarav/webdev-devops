// enum Status {
//     Pending, // 0
//     Active, // 1
//     Suspended // 2
// }

// const s: Status = 99;

type Status = "pending" | "active" | "suspended";

function setStatus(status: Status){
    console.log(`Setting status: ${status}`);
}

setStatus("active");
setStatus("pending");
// setStatus("invalid")

// when we need enum type in obects

const STATUS = {
    Active: "active",
    Pending: "pending",
    Suspended: "suspended"
} as const;

type status = (typeof STATUS)[keyof typeof STATUS];

Object.values(STATUS).forEach(status => {console.log(status);});