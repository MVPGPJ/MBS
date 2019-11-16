var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let mySocket = null;
io.on('connection', function(socket){
    mySocket = socket
});

http.listen(5000,"localhost");

module.exports = mySocket