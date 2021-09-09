const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }
})


module.exports = mongoose.model('Column', ColumnSchema)
