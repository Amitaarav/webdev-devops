
const express = require("express");

// Schemas
const users = [{
    id: 1,
    username: "harkirat", // uniquenss constraint
    password: "123123"
}, {
    id: 2,
    username: "raman",
    password: "123123"
}];

const organizations = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding platform",
    admin: 1,
    members: [2]
}, {
    id: 2,
    title: "ramans org",
    description: "Experimenting",
    admin: 2,
    members: []
}];

const boards = [{
    id: 1,
    title: "100xschool website (frontend",
    organizationId: 1
}];

const issues = [{
    id: 1,
    title: "Add dark mode",
    boardId: 1,
    state: "IN_PROGRESS"
}, {
    id: 2,
    title: "Allow admins to create more courses",
    boardId: 1,
    state: "DONE" // NEXT_UP | "IN_PROGRESS" | "DONE" | "ACHIEVED"
}];


const app = express();

app.post("/signup", (res, res) => {

})

app.post("/sigin", (req, res) => {

})

app.post("/organisations", (req, res) => {

})


app.listen(3000);


