const mongoose = require('mongoose');
const { Schema } = mongoose;

const counsellorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    refreshToken: [String]
});

module.exports = mongoose.model('Counsellor', counsellorSchema);