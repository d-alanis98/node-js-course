const socketIO = require('socket.io');
//Socket object that will contain the socket io instance
const socket = {};

const connect = server => {
    socket.io = socketIO(server);
}

module.exports = {
    connect,
    socket
};