const express = require('express');
//Controller
const { addUser, getUsers } = require('./controller');
//Router
const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);

module.exports = router;