const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');

const AssetSchema = new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    assetId: {
        type: String,
        unique: true
    },
    squaremeter: {
        type: String,
        required: true
    },
    certificateno: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // owner:{
    //     type: String,
    //     unique: true
    // },
    occupation:{
        type: String,
        required: true
    },

    // location:{
    //     type: String,
    //     unique: true
    // },
    // This shown have the coordinate of the building the longitude and latitude
    
    location_sketch:{
        type: String,
        unique: true
    },
    picture:{
        type: String,
        unique: true
    },
    dateOfReg:{
        type: Date,
    },
    surveyPlan:{
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
    approved:{
        type: Boolean,
        default: false
    },

});

//Third argument here is naming the collection in which the data would be stored
const Asset = module.exports = mongoose.model('Asset', AssetSchema, 'Asset');




module.exports.getAssetById = function(Id, callback){
    Asset.findById(Id, callback);
}

// module.exports.getAssetByUsername = function(username, callback){
//     const query = {username:username};
//     User.findOne(query, callback);
// }

 module.exports.addAsset= function(newAsset, callback){
//     bcrypt.genSalt(10, (err, salt)=>{
//         bcrypt.hash(newUser.password, salt, (err, hash)=>{
//             if(err) throw err; 
//             newUser.password = hash;
//             newUser.save(callback);

//         });
//     });
 }

// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }

