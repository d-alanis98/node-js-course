const store = require('./store');
const response = require('../../network/response');


const getChatUsers = (req, res) => {
    store.list()
        .then(users => response.success(req, res, 200, users))
        .catch(error => response.error(req, res, 500, error));
}

const addUsersToChat = (req, res) => {
    const { users } = req.body;
    if(!Array.isArray(users) || users.length === 0)
        return response.error(req, res, 400, 'Invalid fields');
    const chat = { 
        users,
    };
    store.add(chat);
    return response.success(req, res, 201, users);
}

const getChatsByUser = (req, res) => {
    const { params: { userId } } = req;
    if(!userId)
        return response.error(req, res, 400, 'User ID is required');
    store.list()
        .then(users => response.success(req, res, 200, users))
        .catch(error => response.error(req, res, 500, error));
}



module.exports = {
    getChatUsers,
    addUsersToChat,
    getChatsByUser,
}