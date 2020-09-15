const db = require('mongoose');

db.Promise = global.Promise;

const connect = async () => {
    await db.connect(process.env.MONGO_DB_CONNECTION_URL, {
        useNewUrlParser: true,
    });
    console.log('[db] Connected successfully');
}

module.exports = connect;

