$(function () {
  			var socket = io('http://172.18.16.194:3000');
  			$('form').submit(function(){
  				socket.emit('chat message', $('#message').val());
  				$('#message').val('');
  				return false;
  			});
  			socket.on('chat message', function(msg){
  				$('#messages').append($('<li>').text(msg));
  			});
  		});