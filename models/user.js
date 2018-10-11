const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
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
        required: true
    },
    userId:{
        type: String,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: false
    },
    secretToken:{
        type: String
    }

});

//Third argument here is naming the collection in which the data would be stored
const User = module.exports = mongoose.model('User', UserSchema, 'User');


module.exports.getUserById = function(Id, callback){
    User.findById(Id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username:username};
    User.findOne(query, callback);
}

module.exports.addUser= function(newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
           if(err) throw err; 
            newUser.password = hash;
            newUser.save(callback);

        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
