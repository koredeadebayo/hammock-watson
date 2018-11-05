const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

const loanRequestSchema = new Schema({
    requestId:{
        type: String,
        required: true
    },
    //Username of the Potential Debtor
    debtor: { 
        type: String, 
        required: true 
    },
    propertyId:{
        type: String,
        required: true
    },
    //Bankname as in the bank model
    bankname:{
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
    disagreed:{
        type: Boolean,
        default: false
    },
    amount:{
        type: Number,
        required: true
    },
    interestRate:{
        type: Number
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now,
    },
    agreedAt:{
        type: Date
    },
    duration:{
        type: Number
    }

});

const LoanRequest = module.exports = mongoose.model('LoanRequest', loanRequestSchema, 'LoanRequest');


module.exports.getLoanRequestById = function(Id, callback){
    LoanRequest.findById(Id, callback);
}

module.exports.getLoanRequestByDebtor = function(debtor, callback){
    const query = {debtor:debtor};
    LoanRequest.findOne(query, callback);
}

module.exports.getLoanRequestByBank = function(bankname, callback){
    const query = {bankname:bankname};
    LoanRequest.findOne(query, callback);
}

module.exports.getLoanRequestByPropertyId = function(propertyId, callback){
    const query = {propertyId:propertyId};
    LoanRequest.findOne(query, callback);
}

module.exports.getLoanRequestByRequestId = function(requestId, callback){
    const query = {requestId:requestId};
    LoanRequest.findOne(query, callback);
}
module.exports.addLoanRequest= function(newLoanRequest, callback){
    newLoanRequest.save(callback);
 }