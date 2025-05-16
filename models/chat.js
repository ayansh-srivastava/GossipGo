const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    content: {
        type: String, 
        required: true 
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
