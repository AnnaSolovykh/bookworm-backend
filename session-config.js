const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_LINK,
    collection: 'sessions',
});
store.on('error', (error) => {
    console.log('MongoDBStore error:', error);
});

// Configure session parameters
const sessionOptions= {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: false, // once its deployment change it to true
        sameSite: 'strict',
    },
};

module.exports = sessionOptions;