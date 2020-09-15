const db = require('mongoose');
const Model = require('./model');

db.Promise = global.Promise;
db.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
});

console.log('[db] Connected successfully');

const addMessage = message => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async (userFilter) => {
    let filter = { };
    if(userFilter != null) {
        filter = { user: userFilter }
    }
    const messages = await Model.find(filter);
    return messages;
};

const getMessageById = async (messageId) => {
    const message = await Model.findOne({
        _id: messageId,
    });
    return message;
}

const updateMessage = async (messageId, user, message) => {
    const messageToUpdate = await Model.findOne({
        _id: messageId,
    });
    //We update the properties
    messageToUpdate.user = user;
    messageToUpdate.message = message;
    const updatedMessage = await messageToUpdate.save();
    return updatedMessage;
}

const deleteMessage = async (messageId) => {
    const messageToDelete = await Model.deleteOne({
        _id: messageId,
    });
}

module.exports = {
    add: addMessage,
    get: getMessageById,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage,
};