require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const session = require('express-session');
const sessionOptions = require('./session-config');

/*security packages*/
const cors = require('cors');

// routes
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

/*middleware*/
const authenticateUser = require('./middleware/authentication');

const PORT = process.env.PORT || 4000; 

app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));

app.use(session(sessionOptions));

/* routes */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', authenticateUser, booksRouter);

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_LINK);
        app.listen(PORT, console.log(`Server is listening on ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

start();
