const { Schema, model } = require('mongoose');

const schema = new Schema({
    type: String,
    info: {
        userName: String,
        text: String,
        date: Date,
    },
});

module.exports = model('Message', schema);
