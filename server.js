const express = require('express')
const app = express()
const http = require('http').createServer(app);

const port = 3000 || process.env.port

http.listen(port, () => {
    console.log(`Listning on Port ${port}`)
})

// we are going to use "middleware of express" here
app.use(express.static(__dirname+'/public'))

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/index.html');
})

// Socket

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log('Connected...')

    socket.on('message', (msg) =>{
        socket.broadcast.emit('message', msg);  // broadcast means wo sended message sbke pass jaega uss server pe jitne v log connected honge sbke pass
        // now we have to go back to client to recieve the same msg from the server
    })
})