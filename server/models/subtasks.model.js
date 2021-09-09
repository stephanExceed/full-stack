const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    taskId: {
        type: String
    },
    status: {
        type: Boolean
    }
})


module.exports = mongoose.model('SubTask', SubTaskSchema)
