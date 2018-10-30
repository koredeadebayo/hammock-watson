const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');

const AssetSchema = new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    propertyId: {
        type: String,
        unique: true
    },
    squareMeters: {
        type: Number,
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
    owner:{
         type: String,
         unique: true
     },
    occupation:{
        type: String,
        required: true
    },

    location:{
        type: String,
        //unique: true
    },
    //This shown have the coordinate of the building the longitude and latitude
    
    location_sketch:{
        type: String,
        //unique: true
    },
    picture:{
        type: String,
        //unique: true
    },
    dateOfReg:{
        type: Date,
    },
    surveyPlan:{
        type: String,
        //unique: true
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
    price:{
        type: Number
    },
    government:{
        type: String
    },
    forsale:{
        type: Boolean,
        default: false
    }

    // "$class": "org.hammock.network.realEstate",
    // "propertyId": "string",
    // "address": "string",
    // "squareMeters": 0,
    // "price": 0,
    // "imagelink": "string",
    // "description": "string",
    // "dateOfRegistration": "string",
    // "landSurveyLink": "string",
    // "coordinates": [],
    // "owner": {},
    // "government": {}
});

//Third argument here is naming the collection in which the data would be stored
const Asset = module.exports = mongoose.model('Asset', AssetSchema, 'Asset');




module.exports.getAssetById = function(Id, callback){
    Asset.findById(Id, callback);
}
 
 module.exports.getAssetByPropertyId = function(propertyId, callback){
     const query = {propertyId:propertyId};
     Asset.findOne(query, callback); 
 }

 module.exports.addAsset= function(newAsset, callback){
    newAsset.save(callback);
 }

// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }

