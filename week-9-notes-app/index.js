const express = require("express");

const app = express();
app.use(express.json()); // for req.body 
const notes = []; // This is bad -- eventually we'll learn about databases
const users = [];
//POST - Create  a note
app.post("/notes", function(req, res){
    const note = req.body.note;
    notes.push(note)
    res.json({
        message: "Done",
    })
})


//GET - Get notes
app.get("/notes", function(req, res){
    res.json({
        notes
    })
})

app.get("/", function(req, res) {
    res.sendFile("/Users/USER/Desktop/100xBootcamp/Web2-Devops/week-9-notes-app/frontend/index.html")
})

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const userExists = users.find(user =>user.username === username);
    if(userExists){
        return res.status(403).json({
            message: "User with this username already exists"
        })
    }
})

app.listen(3000, function(){
    console.log("Server running at 3000")
});