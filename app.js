require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const session = require('express-session');
const sessionOptions = require('./session-config');

//security packages
const cors = require('cors');

//extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// routes
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

//middleware
const authenticateUser = require('./middleware/authentication');

//error handler
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const PORT = process.env.PORT || 4000; 

app.use(express.json()); 
app.set('trust proxy', 1);
app.use(session(sessionOptions));

//security
app.use(cors({
    origin: ['http://localhost:3000', 'https://booksworm-redux-shop.vercel.app', 'https://booksworm-redux-shop-git-main-annasolovykh.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, 
        max: 100, 
    })
);
app.use(helmet());
app.use(xss());

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', authenticateUser, booksRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_LINK);
        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

start();
