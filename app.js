var express = require('express')
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
	
   res.sendFile(__dirname+'/index.html');
});

//whenever someone connects this gets executed

io.on('connection',function(socket){
	console.log('A user connected');

	//send a msg after a timeout 4 sec
	setTimeout(function(){
		//socket.send('sent a msg 4 sec after connection');
		socket.emit('serverEvent',{desc:'a custom event'});
	},4000);

	socket.on('clientEvent',function(data){
		console.log('clientEvent data',data);
	});
	
	//wherever someone disconnects this piece of code executed
	socket.on('disconnect',function(){
		console.log('A user disconnected');
	});
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
