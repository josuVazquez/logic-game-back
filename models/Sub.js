const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({

    endpoint: {
        type: String,
    },
    expirationTime: {
        type: String
    },
    keys: {
        p256dh: {
            type: String
        },
        auth: {
            type: String
        }
    }

});

module.exports = mongoose.model('sub', subSchema);