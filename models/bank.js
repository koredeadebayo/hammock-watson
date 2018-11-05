const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const BankSchema = new mongoose.Schema({
    // participant Bank identified by bankId {
    //     o String bankId
    //     o String username
    //   }

    bankId: {
        type: String
        
    },
    bankname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    blockUserID: {
        type: String
    },
    blockUserSecret:{
        type: String
    }
    
});

//Third argument here is naming the collection in which the data would be stored
const Bank = module.exports = mongoose.model('Bank', BankSchema, 'Bank');


module.exports.getBankById = function(Id, callback){
    Bank.findById(Id, callback);
}

module.exports.getBankByUsername = function(username, callback){
    const query = {username:username};
    Bank.findOne(query, callback);
}

module.exports.getBankByBankName= function(bankname, callback){
    const query = {bankname:bankname};
    Bank.findOne(query, callback);
}
module.exports.getBankByBankId = function(bankId, callback){
    const query = {bankId:bankId};
    Bank.findOne(query, callback);
}

module.exports.addBank= function(newBank, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newBank.password, salt, (err, hash)=>{
            if(err) throw err; 
            newBank.password = hash;
            newBank.save(callback);

        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

