
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Id must be provided'],
    },
    name: {
        type: String,
        required: [true, 'Name must be provided'],
    },
    author: {
        type: String,
        required: [true, 'Author must be provided'],
    },
    price: {
        type: Number, 
        required: [true, 'Price must be provided'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, 
    { timestamps: true }
);

module.exports = mongoose.model('Book', BookSchema);