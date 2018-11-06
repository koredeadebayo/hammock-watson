const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const AdminSchema = new mongoose.Schema({
    adminId: {
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
const Admin = module.exports = mongoose.model('Admin', AdminSchema, 'Admin');


module.exports.getAdminById = function(Id, callback){
    Admin.findById(Id, callback);
}

module.exports.getAdminByName = function(name, callback){
    const query = {name:name};
    Admin.findOne(query, callback);
}

module.exports.addAdmin= function(newAdmin, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newAdmin.password, salt, (err, hash)=>{
            if(err) throw err; 
            newAdmin.password = hash;
            newAdmin.save(callback);

        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

