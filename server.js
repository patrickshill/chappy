const express = require("express");
const app = express();
const path = require("path");
const router = require("./server/config/routes");

app.listen(8000,function(){
    console.log("Listening on port 8000");
});

app.use(express.static(path.join(__dirname+"/client/dist/client")));

router(app);

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/client/index.html"))
});


// const server = 
// const io = require("socket.io")(server);

// io.on("connection", function(socket) {
//     socket.emit("connection", {msg:"Ello mate, this be the server"});
// })