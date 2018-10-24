const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const GovSchema = new mongoose.Schema({
    // "$class": "org.hammock.network.Government",
    // "govId": "string",
    // "name": "string",
    // "govRate": 0,
    // "reassignCost": 0,
    // "balance": "0.0",

    govId: {
        type: String
        
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

//Third argument here is naming the collection in which the data would be stored
const Gov = module.exports = mongoose.model('Gov', GovSchema, 'Gov');




module.exports.getGovById = function(Id, callback){
    Gov.findById(Id, callback);
}

module.exports.getGovByName = function(name, callback){
    const query = {name:name};
    Gov.findOne(query, callback);
}

module.exports.addGov= function(newGov, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newGov.password, salt, (err, hash)=>{
            if(err) throw err; 
            newGov.password = hash;
            newGov.save(callback);

        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

