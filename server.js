const app =  require('express')()
const http = require('http').createServer(app)


const io = require('socket.io')(http)

// Configura a route.
app.get('/', (req, res)=>{
    res.sendFile(__dirname+ '/index.html')
})

// Para exibir quando umusuario conectar.
io.on('connection', (socket)=>{
    // Exibe o id do usuario conectado ao socket.
    console.log('Nova coneção', socket.id)
    socket.on('mensagens', (mensagem)=>{
        console.log(mensagem)
        // Broadcast envia mensagem para todos menos o proprio socket.
        socket.broadcast.emit('mesangem', mensagem);
    })
})

http.listen(3000, function(){
    console.log('Disponivel na porta 3000');
})