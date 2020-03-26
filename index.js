var express = require("express");
var socket = require("socket.io");
//App Setup

var app = express();
var server = app.listen(4000, function () {
    console.log("lister to request port 4000");
});

//Static Files
app.use(express.static("public"));

//Socket Setup
var io = socket(server);

io.on("connection", function (socket) {
    console.log("Connection established", socket.id)
    //listen argument("chat",object) received from chat.js 

    socket.on("chat", function (data) {
        //send message to all sockets who are coneected to the server
        io.sockets.emit("chat", data);
    })

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });
});