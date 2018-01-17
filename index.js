//Requiring in what we need
const app = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const fs = require('fs');

//Route handler// This one wasn't working so I did fs instead
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/view/index.html');
// });


fs.readFile('/', function (req, res) {
  fs.readFile('./index.html');
});

io.on('connection', function(socket) {
  console.log('user connected!');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

//
// const socket = io.connectWithSession();
// prepareSocketIO();
// socket.on('connect', function() {
//   console.log('connection made');
//   socketReady= true;
// })


// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 3000;

//Route handler
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });


//chat turns on and transmits messages
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });


//Console log to make sure server is up
http.listen(3000, function(){
  console.log('listening on PORT:3000');
});
