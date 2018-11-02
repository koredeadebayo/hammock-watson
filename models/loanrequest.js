const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

const loanRequestSchema = new Schema({
    borrower: { 
        type: String, 
        required: true 
    },
    propertyId:{
        type: String,
        required: true
    },
    bank:{
        type: String,
        required: true
    },
    accepted:{
        type: Boolean,
        default: false
    },
    rejected:{
        type: Boolean,
        default: false
    },
    agreed:{
        type: Boolean,
        default: false
    },
    amount:{
        type: Number,
        required: true
    },
    interestRate:{
        type: Number,
        required: true
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now,
        expires: 43200 
    }

});

const LoanRequest = module.exports = mongoose.model('TradeRequest', tradeRequestSchema, 'TradeRequest');


module.exports.getTradeRequestById = function(Id, callback){
    TradeRequest.findById(Id, callback);
}

module.exports.getTradeRequestByBuyer = function(buyer, callback){
    const query = {buyer:buyer};
    TradeRequest.findOne(query, callback);
}

module.exports.getTradeRequestByPropertyId = function(propertyId, callback){
    const query = {propertyId:propertyId};
    TradeRequest.findOne(query, callback);
}

module.exports.addTradeRequest= function(newTradeRequest, callback){
    newTradeRequest.save(callback);
 }