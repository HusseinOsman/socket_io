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
io.on('connection',function(socket){
	clients++;

	console.log('A user connected');
	
socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})

	socket.on('clientEvent',function(data){
		console.log('clientEvent data',data);
	});
	
	//wherever someone disconnects this piece of code executed
	socket.on('disconnect',function(){
		clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})

	});
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
