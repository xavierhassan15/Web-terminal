const mongoose = require('mongoose');


const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    visitedAttractions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Attraction'
    }
})

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;