const mongoose = require('mongoose');
const { NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/async-wrapper');
const Book =  require('../models/Book');

const getBooks = asyncWrapper(async (req, res) => {
    const favoriteBooks = await Book.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ favoriteBooks, count: favoriteBooks.length  })
});

const addBooks = asyncWrapper(async (req, res, next) => {
    const bookData = req.body;
    bookData.createdBy = req.user.userId;

    const book = await Book.create({
        id: bookData.id,
        name: bookData.name,
        author: bookData.author,
        price: bookData.price,
        createdBy: bookData.createdBy, 
    });

    res.status(StatusCodes.CREATED).json( book );
});

const deleteBook = asyncWrapper(async (req, res) => {
    const { 
        user: { userId }, 
        params:{ id: bookId } 
    } = req;

    const favoriteBook = await Book.findOneAndRemove({
        id: bookId, 
        createdBy: userId
    });

    if (!favoriteBook) {
        throw new NotFoundError(`No book was found with id ${bookId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." })
});

module.exports = {
    getBooks,
    addBooks,
    deleteBook
};