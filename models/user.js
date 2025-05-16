const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/index')

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.genToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);
