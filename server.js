var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');

var socketio = require('socket.io');
var app = express();

server.on('request', app);

var io = socketio(server);

io.on('connection', function(socket){
  console.log("A new client has connected");
  console.log(socket.id);

  socket.on('draw', function(data) {
    console.log(data);
    socket.broadcast.emit('draw', data);
  })

  socket.on('closing', function(data){
    console.log(data);
  })

  socket.on('disconnect', function(data) {
    console.log(data);
    console.log('someone left :(')
  })
})


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});