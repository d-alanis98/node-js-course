//Component routes
const user = require('../components/user/network');
const chat = require('../components/chat/network');
const message = require('../components/messages/network');

const routes = server => {
    server.use('/user', user);
    server.use('/chat', chat);
    server.use('/message', message);
}

module.exports = routes;