const express = require('express');
//Controller
const { getChatUsers, addUsersToChat, getChatsByUser } = require('./controller');
//Router
const router = express.Router();

//Routes
router.get('/', getChatUsers);
router.post('/', addUsersToChat);
router.get('/:userId', getChatsByUser);

module.exports = router;