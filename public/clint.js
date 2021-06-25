var socket = io();
      
   var messages = document.getElementById('messages'); 
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  var inpu = document.getElementById('inpu');
  var room = document.getElementById('room');
  let date_ob = new Date();
  var fname = localStorage.getItem("name");
  var room_name= localStorage.getItem("room");
 
  socket.emit('join chat', {room:room_name,name :fname });
      
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (input.value && fname) {
     
      var time=moment().format('h:mm:ss a')

      socket.emit('chat message', {time:time,tex: input.value ,name :fname,room:room_name });
      input.value = '';
      input.focus();
      
    }
    
  })

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    var it = document.createElement('span');
    var par = document.createElement('span');
    it.setAttribute("class","ti")
    par.setAttribute("class","mes")
    it.textContent= "    "+msg.time
    par.textContent= msg.tex
    item.textContent = msg.name+" :   " ;
    item.appendChild(par);
    item.appendChild(it);
    
    messages.appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
  });