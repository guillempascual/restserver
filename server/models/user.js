const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add email address']
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        default: 'USER_ROLE',
    },
    status: {
        type: Boolean,
        default: true,

    },
    google: {
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.models('User', userSchema);