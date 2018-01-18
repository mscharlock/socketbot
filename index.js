//Requiring in what we need
// const express = require('express');
// const app = express();
// const http = require('http').Server(app);

//server related variables
const port = 3000;
const WebSocketServer = require('websocket').server;
const http = require('http');

//chat related variables
let history = [];
let clients = [];


//Helper function for escaping input strings
function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//http server
const server = http.createServer(function (req, res) {
});

server.listen(port, function() {
  console.log('Server listening on: ' + port);
});

//connect the wsServer to http server
const wsServer = new WebSocketServer({
  httpServer: server,
});

//
wsServer.on('request', function(request) {
  console.log('Connection from origin: ' + request.origin);
  let connection = request.accept(null, request.origin);

  let index = clients.push(connection) - 1;
  let userName = false;

  console.log(('Connection accepted'));

  if (history.length > 0) {
    connection.sendUTF(
      JSON.stringify({type: 'history', data: history})
    );
  }

  connection.on('message', function(message) {
    if(message.type === 'utf8') {
    if (userName === false) {
      userName = htmlEntities(message.utf8Data);
      console.log('Username: ' + userName);
    } else {
      console.log('Received a message from :' + userName + ': ' + message.utf8Data);

      let historyTracker = {
        text: htmlEntities(message.utf8Data),
        author: userName,
      };
      history.push(historyTracker);

      let json = JSON.stringify({type: 'message', data: historyTracker});
      for (let i = 0; i < clients.length; i++) {
        clients[i].sendUTF(json);
      }
    }
    }
  });

  connection.on('close', function(connection) {
    if (userName !== false) {
      console.log('Disconnected: ' + connection.remoteAddress);
    clients.splice(index, 1);
    }
  });
});



// const io = require('socket.io')(http);
//
//
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });
//
// //Open the socket and emit//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
//
// //Console log to make sure server is up
// http.listen(3000, function(){
//   console.log('listening on PORT:3000');
// });
