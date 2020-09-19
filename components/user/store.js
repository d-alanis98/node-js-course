const Model = require('./model');

const addUser = user => {
    const newUser = new Model(user);
    newUser.save();
}

const getUsers = async () => {
    return Model.find();
}

module.exports = {
    add: addUser,
    list: getUsers,
}