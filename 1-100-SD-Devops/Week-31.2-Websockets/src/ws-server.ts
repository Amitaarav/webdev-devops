import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// const subscriptions : {[key : string]} : {
//     ws : WebSocket,
//     rooms: string[
// } = {
//     "user1":{
//         ws: WebSocket,
//         rooms: ["room1"]
//     }
// }
wss.on("connection", function connection(ws){
    // const id = randomID();
    
    ws.on("message", function incoming(message){
        console.log(`received: ${message}`);
    })

    ws.send("something");
}   
);

function randomID(){
    return Math.floor(Math.random() * 1000);
}