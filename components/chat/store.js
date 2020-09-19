const Model = require('./model');

const addUsersToChat = users => {
    const chatUsers = new Model(users);
    chatUsers.save();
}

const getChatUsers = async userId => {
    return new Promise((resolve, reject) => {
        let filter = {}
        if(userId) {
            filter = {
                'users': userId,
            };
        }

        Model.find(filter)
            .populate('users')
            .exec((error, populated) => {
                if(error)
                    return reject(error);
                resolve(populated);
            });
    });
}

module.exports = {
    add: addUsersToChat,
    list: getChatUsers,
}