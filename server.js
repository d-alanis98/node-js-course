require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
//Web socket
const socket = require('./socket');
//Port
const PORT = process.env.PORT || 3000;
//Database connection facade
const db = require('./database');
//General router
const router = require('./network/routes');
//We create an express instance
const app = express();
//HTTP server with express instance
const server = require('http').Server(app);
//We make the connection to the database
db();
//We apply middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//We provide the server to the socket instance
socket.connect(server);
//We provide the express instance to the router
router(app);


//Serving static files
app.use('/app', express.static('public'));

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

