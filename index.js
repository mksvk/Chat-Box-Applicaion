const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static(__dirname + '/public'));
const { Server } = require("socket.io");
const io = new Server(server);
var moment = require('moment'); 



io.on('connection', (socket) => {

    console.log('a user connected');
    socket.on('join chat', (msg) => {
      socket.join(msg.room);
      
      var welcome_mes="Hello "+msg.name + " welcome to MK's chatbox"
      var new_user=msg.name + " joined the chat"
      socket.emit('chat message',{name:"Admin",tex:welcome_mes})
      socket.broadcast.to(msg.room).emit('chat message',{name:"Admin",tex:new_user})
      
      
    socket.on('disconnect', () => {
      var disconnect_mes =msg.name+" just disconnected"
      console.log('user disconnected');
      socket.broadcast.emit('chat message',{name:"Admin",tex:disconnect_mes})
     
    });
    })
    
     
      socket.on('chat message', (msg) => {
        
        io.to(msg.room).emit('chat message', msg);
        console.log('message: ' + msg);
      });

  });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/first.html');
  });


app.get('/first', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
app.post("/first",(req,res)=>{
   console.log(req.body) 
   res.redirect("/first")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
server.listen(port, () => {
    console.log('listening on *:3000');
  });