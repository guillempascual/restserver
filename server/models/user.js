const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: "{value} no es un rol válido",
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        unique: true,
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
        type: String,
        default: 'USER_ROLE',
        enum: validRoles,
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

userSchema.methods.toJSON = function() {
    let user = this
    let userObject = this.toObject()
    delete userObject.password

    return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });
module.exports = mongoose.model('User', userSchema);