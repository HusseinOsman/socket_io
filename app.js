var express = require('express')
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
	
   res.sendFile(__dirname+'/index.html');
});

//whenever someone connects this gets executed

var nsp = io.of('/my-namespace');

nsp.on('connection', function(socket) {
   console.log('someone connected');
   nsp.emit('hi', 'Hello everyone!');
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
