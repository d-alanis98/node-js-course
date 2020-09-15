const express = require('express');
const bodyParser = require('body-parser');

const router = require('./network/routes');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//We provide the express instance to the router
router(app);


//Serving static files
app.use('/app', express.static('public'));

app.listen(3000);

console.log('Server running on http://localhost:3000');