var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));
app.get('/',(req,res) => {
    res.sendFile('/index.html');
})
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("start",(obj) => {
    socket.broadcast.emit("start",obj)
  })
  socket.on("drawing",(obj) => {
    socket.broadcast.emit("drawing",obj)
  })
});


http.listen(4000, function(){
  console.log('listening on *:4000');
});
