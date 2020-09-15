//Response facade
const response = require('../../network/response');
const store = require('./store');

const addMessage = (req, res) => {
    const { user, message } = req.body;
    if(!user || !message) {
        return response.error(req, res, 400, 'All fields are required');
    }
    const newUserMessage = {
        user,
        message,
        time: Date.now()
    }

    store.add(newUserMessage);
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