whiteboard.on('draw', function(start, end, strokeColor){
  
})

var socket = io(window.location.origin);

socket.on("connect", function(){
  console.log("I have made a persistent two way connection to the server!");
})


var ctx = document.getElementById("paint").getContext('2d');

socket.on('disconnect', function() {
  console.log(":(")
})

whiteboard.on('draw', function(start, end, strokeColor) {
  socket.emit('draw', 
    { start: start, end: end, strokeColor: strokeColor }
  );
})

socket.on('draw', function(data) {
  whiteboard.draw(data.start, data.end, data.strokeColor);
})

