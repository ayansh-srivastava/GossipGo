const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomname: {
        type: String,
        required: true,
    },
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }],
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    isPrivate: { 
        type: Boolean, 
        default: false 
    },
    messages: [
        {
            sender: { type: String, required: true },
            message: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);