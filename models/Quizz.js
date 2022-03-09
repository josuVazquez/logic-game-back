const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizzSchema = new Schema({
    date: {
        type: Date,
    },
    code: {
        type: String
    }
});

module.exports = mongoose.model('quizz', quizzSchema);