const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const SPSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    userId:{
        type: String,
        unique: true
    },
    address:[
        {
         street:{
            type: String
         }, 
         city:{
            type: String
         },
         state: {
            type: String
         },
         country: {
            type: String
         },
         postalcode: {
            type: String
         }
    }],
    categories:{ 
        type: String,
        required: true
    },
    businessname:{ 
        type: String,
        required: true
    },
    businessreg:{ 
        type: String,
        required: true
    },    
    active:{
        type: Boolean,
        default: false
    }

});

//Third argument here is naming the collection in which the data would be stored
const SP = module.exports = mongoose.model('SP', SPSchema, 'SP');




module.exports.getSPById = function(Id, callback){
    SP.findById(Id, callback);
}

module.exports.getSPByUsername = function(username, callback){
    const query = {username:username};
    SP.findOne(query, callback);
}

module.exports.addSP= function(newSP, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newSP.password, salt, (err, hash)=>{
            if(err) throw err; 
            newSP.password = hash;
            newSP.save(callback);

        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
