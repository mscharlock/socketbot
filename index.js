//Requiring in what we need
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

 // Handle form submits
// document.querySelector('form').addEventListener('submit', e => submitMessage(e, socket));
//


//Console log to make sure server is up
http.listen(3000, function(){
  console.log('listening on PORT:3000');
});



// io.on('connection', function(socket) {
//
//   socket.on('join', function(data) {
//     socket.join(data.type);
//     socket.session = {
//       name: data.name,
//     };
//     console.log(data);
//     console.log('someone joined');
//   });
// });
//
//
// io.on('disconnect', function() {
//   console.log('connection closed');
// });
// // const socket = io.connectWithSession();
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
