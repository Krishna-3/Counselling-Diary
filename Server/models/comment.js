const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    editedOn: {
        type: Date
    },
    student: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);