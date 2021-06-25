const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static(__dirname + '/public'));
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
      });
  });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
server.listen(port, () => {
    console.log('listening on *:3000');
  });