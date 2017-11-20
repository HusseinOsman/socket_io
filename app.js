var express = require('express')
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
	
   res.sendFile(__dirname+'/index.html');
});

//whenever someone connects this gets executed
var clients = 0;
var roomno = 1;
io.on('connection',function(socket){
	clients++;
	console.log('A user connected');
	
//Increase roomno 2 clients are present in a room

if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length>1) roomno++;

socket.join("room-"+roomno);
//send this event to everyone in the room
io.sockets.in("room-"+roomno).emit('connectToRoom',"your are in room no. "+roomno);


	//wherever someone disconnects this piece of code executed
	socket.on('disconnect',function(){
		clients--;
socket.leave("room-"+roomno);

	});

});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
