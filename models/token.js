const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now,
        expires: 43200 
    }

});

const Token = module.exports = mongoose.model('Token', tokenSchema);