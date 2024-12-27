const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    attraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;