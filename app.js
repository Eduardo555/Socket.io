var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Para armazenar os usuarios conectados.
var clientes = {};

app.get('/', function(request, response){
response.send('Servidor Rodando!');
});

http.listen(3000, function(){
console.log('Ativo na porta 3000');
});

// Evento para conectaro cliente ao servidor.
io.on("connection", function(client){
    console.log('Usuario Conectado');
});

// Eventos para sala de chat.
// join, send, disconnect.
io.on("connection", function(client){
    
    // Disparado quando entrar algum usuario no sistema.
    client.on("join", function(name){
        console.log("Entrou:" + name);
        // Coloca usuario na lista.
        clientes[client.id] = name;
        client.emit("update", "Você precisa se conectasr com o servidor.");
        client.broadcast.emit("update", name + "Já esta conectado." )
    });

    // Disparado para enviar uma nova mensagem
    client.on("send", function(mensagem){
        console.log("Mensagem: "+ mensagem);
        client.broadcast.emit("chat", clientes[client.id], mensagem);
    });

    // Disparado para desconectar um usuario do servidor.
    client.on("disconnect", function(){
        console.log("Desconectado");
        io.emit("update", clientes[client.id] + "Saio do servidor.");
        delete clientes[client.id];
    });

});