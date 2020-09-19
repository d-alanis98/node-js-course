const store = require('./store');
//Socket instance
const { socket } = require('../../socket');
//Response facade
const response = require('../../network/response');

const addMessage = (req, res) => {
    const { 
        body: { user, chat, message },
        file
     } = req;
    if(!user || !chat || !message) {
        return response.error(req, res, 400, 'All fields are required');
    }
    let fileUrl = '';
    if(file)
        fileUrl = `/app/files/${file.filename}`
    const newUserMessage = {
        user,
        chat,
        message,
        time: Date.now(),
        file: fileUrl
    }

    store.add(newUserMessage);
    socket.io.emit('message', newUserMessage);
    return response.success(req, res, 201, newUserMessage);
}

const getMessages = (req, res) => {
    const messagesFilter = req.query.user || null;
    store.list(messagesFilter)
        .then(messages => response.success(req, res, 200, messages));
}

const updateMessage = (req, res) => {
    const { 
        body: { user, message },
        params: { id: messageId } 
    } = req;
    if(!messageId || !user || !message)
        return response.error(req, res, 400, 'All parameters are required');
    store.update(messageId, user, message)
        .then(updatedMessage => response.success(req, res, 200, updatedMessage))
        .catch(error => response.error(req, res, 500, error));
}

const deleteMessage = (req, res) => {
    const {
        params: { id: messageId }
    } = req;
    if(!messageId)
        return response.error(req, res, 400, 'Message id is required');
    store.delete(messageId)
        .then(() => response.success(req, res, 200, `Message ${messageId} deleted successfully`))
        .catch(error => response.error(req, res, 500, error));
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}