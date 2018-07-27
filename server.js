const express = require("express");
const app = express();
const path = require("path");
const router = require("./server/config/routes");

app.use(express.static(path.join(__dirname+"/client/dist/client")));

router(app);

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/client/index.html"))
});

let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on("connection", (socket) => {

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('message', (message => {
        console.log("Message Received: " + message );
        io.emit('message', message);
    }));

})
app.listen(8001);
http.listen(8000);


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