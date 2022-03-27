const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
    date: {
        type: Date,
    },
    name: {
        type: String
    },
    number: {
        type: Number
    }
});

module.exports = mongoose.model('ranking', rankingSchema);