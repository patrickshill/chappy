const express = require("express");
const app = express();
const path = require("path");
const router = require("./server/config/routes");
let http = require('http');

let server = http.createServer(app);
app.use(express.static(path.join(__dirname+"/client/dist/client")));

router(app);

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/client/index.html"))
});

// let http = require('http').Server(app);
let io = require('socket.io').listen(server);
server.listen(8000);

io.on("connection", (socket) => {

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('message', (message => {
        console.log("Message Received: " + message );
        io.emit('message', {type:'new-message', text: message});
    }));

    function sendHeartbeat(){
        setTimeout(sendHeartbeat, 8000);
        io.sockets.emit('ping', { beat : 1 });
    }
    
    io.sockets.on('connection', function (socket) {
        socket.on('pong', function(data){
            console.log("Pong received from client");
        });
    });
    
    setTimeout(sendHeartbeat, 8000);

})




// function createNameSpace(i){
//     var group = io.of('/group-' + i);
//     group.on('connection', function(socket){
//         socket.on('message.send', function (data){
//             group.emit('message.sent', data);
//         });
//     });
// }

// for (var i = 0; i < 2; i++){
//     createNameSpace(i);
// }