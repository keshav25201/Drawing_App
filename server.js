var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const { v4: uuidv4 } = require('uuid');
const path = require('path')

//middleware
app.use(express.static('public'))
app.set('view engine' ,'ejs')
app.set('views',__dirname + '/public')


// const coll = new Map();

//routes
app.get('/',(req,res) => {
  res.sendFile(__dirname + '/public/homepage.html');
})

app.get('/getcode',(req,res) => {
  let code = uuidv4();
  res.json({code})
})
app.get('/draw/:code',(req,res) => {
    res.render('draw',{roomCode:req.params.code})
})

io.on('connection', function(socket){
  socket.on("join",(roomCode) => {
    socket.room = roomCode;
    socket.join(roomCode);
  })
  socket.on("start",(obj) => {
    socket.broadcast.to(socket.room).emit("start",obj)
  })
  socket.on("drawing",(obj) => {
    socket.broadcast.to(socket.room).emit("drawing",obj)
  })
});


http.listen(4000, function(){
  console.log('listening on *:4000');
});
