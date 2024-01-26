const express = require('express');
const router = express.Router();

const {
    getBooks,
    addBooks,
    deleteBook
} = require('../controllers/books');

router.route('/')   
    .post(addBooks)
    .get(getBooks);
router.route('/:id')
    .delete(deleteBook)

module.exports = router;
