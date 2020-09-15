const express = require('express');
//Controller
const { addMessage, getMessages, updateMessage, deleteMessage } = require('./controller');
//Router
const router = express.Router();

//Routes
router.get('/', getMessages);
router.post('/', addMessage);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;