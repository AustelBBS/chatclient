$(function () {
        var seed = 0;
        var socket = io.connect('http://192.168.1.70:3000');
        $('form').submit(function(){
          var s = getSeed();
          var key = encrypt($('#m').val(), s);
          console.log(s);
          socket.emit('seed', s);
          socket.emit('chat message', key);
          console.log(key);
          $('#m').val('');
          return false;
        });   
        socket.on('chat message', function(key){
          var msg = encrypt(key, -seed);
          $('#messages').append($('<li>').text(key));
          console.log('msg ' + msg);
          });
          socket.on('seed', function(s){
          seed = s;
          console.log('seed = ' + s);
          });
      });

function getSeed () {
  var num = Math.floor(Math.random()*15) + 1; 
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 
  return num;
}

function encrypt (inputString, shiftedpositions){
  var salida = "";
  var oldASCII; //donde se guarda el codigo ascii de una letra
  var newASCII;//codigo ascii resultante luego de sumarle shiftedpositions
  //por cada letra de la entrada
  for(var c = 0; c < inputString.length; c++){
    oldASCII = inputString[c].charCodeAt();//obtenemos su codigo
    newASCII = oldASCII + shiftedpositions;//desplazamos de lugar la letra al sumarle shiftedpositions
    salida = salida.concat(String.fromCharCode(newASCII));//convertimos el nuevo codigo a string y concatenamos
  }
  return salida;
}