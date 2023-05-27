const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'CIC', 'CSM', 'AIM', 'AID', 'CSO', 'ECE', 'EEE', 'CE', 'ME', 'IT']
    },
    batch: {
        type: String,
        required: true
    },
    counsellor: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);