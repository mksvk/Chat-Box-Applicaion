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
    
    audioObj = new Audio("sounds/juntos-607.mp3");
    audioObj.play()
    
    var time_=moment().format('h:mm:ss a')
    var item = document.createElement('li');
    var main_div = document.createElement('div');
    var name_div = document.createElement('div');
    var mess_div = document.createElement('div');
    var span_ = document.createElement('span');


    var it = document.createElement('span');
    var par = document.createElement('span');
    it.setAttribute("class","ti")
    par.setAttribute("class","mes")
    
    main_div.setAttribute("class","con")
    name_div.setAttribute("class","user_name")
    mess_div.setAttribute("class","mess_div")
    span_.setAttribute("class","z")

    it.textContent= "    "+time_
    par.textContent= msg.tex
    name_div.textContent = msg.name ;
    span_.textContent=" : "
    
    mess_div.appendChild(par)
    mess_div.appendChild(it)
    main_div.appendChild(name_div)
    main_div.appendChild(span_)
    main_div.appendChild(mess_div)
    item.appendChild(main_div)
    
    messages.appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
  });