const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

const tradeRequestSchema = new Schema({
    buyer: { 
        type: String, 
        required: true 
    },
    propertyId:{
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
    price:{
        type: Number,
        required: true
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now
    }

});

const TradeRequest = module.exports = mongoose.model('TradeRequest', tradeRequestSchema, 'TradeRequest');


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