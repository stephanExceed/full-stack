const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    columnId: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }
})

module.exports = mongoose.model('Task', TaskSchema);