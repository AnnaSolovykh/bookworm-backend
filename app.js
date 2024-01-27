const express = require('express');
const cors = require('cors'); 
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');
const authenticateUser = require('./middleware/authentication');


require('dotenv').config();

mongoose.set('strictQuery', false)

const PORT = process.env.PORT || 4000; 

app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));

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
