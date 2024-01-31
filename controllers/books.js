const Book =  require('../models/Book');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getBooks = async (req, res) => {
    const favoriteBooks = await Book.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ favoriteBooks, count: favoriteBooks.length  })
};

const addBooks = async (req, res) => {
    try {
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
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data type' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }
};



const deleteBook = async (req, res) => {
    const { 
        user: { userId }, 
        params:{ id: bookId } 
    } = req;

    const favoriteBook = await Book.findOneAndRemove({
        id: bookId, 
        createdBy: userId
    });

    if (!favoriteBook) {
        throw new NotFoundError(`No book was found with id ${favoriteBook}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." })
};

module.exports = {
    getBooks,
    addBooks,
    deleteBook
};