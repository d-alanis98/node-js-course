const express = require('express');
//We create an express instance
const app = express();
//HTTP server with express instance
const server = require('http').Server(app);
//Socket IO
const io = require('socket.io')(server);

const PORT = 3001;

app.use(express.static('public'));

io.on('connection', socket => {
    console.log('New connection');
    socket.emit('message', 'Welcome');
})

server.listen(PORT, () => {
    console.log(`Serving at http://localhost:${PORT}`);
})