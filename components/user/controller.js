const store = require('./store');
//Response facade
const response = require('../../network/response');

const addUser = (req, res) => {
    const { name } = req.body;
    //Validation
    if(!name)
        return response.error(req, res, 400, 'Name is required');
    //We add the user
    const user = { 
        name, 
    };
    store.add(user);
    return response.success(req, res, 201, user);
}

const getUsers = (req, res) => {
    store.list()
    .then(messages => response.success(req, res, 200, messages))
    .catch(error => response.error(req, res, 500, error));
}

module.exports = {
    addUser,
    getUsers,
}