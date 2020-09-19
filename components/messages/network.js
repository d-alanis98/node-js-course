const express = require('express');
const multer = require('multer');
//Controller
const { addMessage, getMessages, updateMessage, deleteMessage } = require('./controller');
//Router
const router = express.Router();
//Multer
const upload = multer({
    dest: 'public/files/',
});

//Routes
router.get('/', getMessages);
router.post('/', upload.single('file'), addMessage);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;