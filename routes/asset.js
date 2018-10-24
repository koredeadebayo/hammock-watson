/*
    Asset Management 
*/

const express = require('express');
const Asset = require('../models/asset');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const assetCtrl = require('../controller/asset');
const Gov = require('../models/gov');

    /*{
    *	"assetId": "123123",
    *	"squaremeter": "SMALL",
    *	"certificate": "PURPLE",
    *	"description": "utkarsh18ife@gmail.com",
    *   "owner": ""//owner's username on the platform
    *   "occupation": ""//
    *   "state": ""/
    *   "location": ""//longitude and latitude
    *   "location_sketch": ""/image
    *   "address": ""//
    *   "picture":""//image of property
    *   "dateOfReg":""//Regexed to filter input dd-mm-yy
    *   "surveyPlan": ""//image
    *  }
    */

//Asset Creation
router.post('/add', passport.authenticate('user-role', {session:false}), async (req, res)=>{
    let user = req.user;
    //console.log(user);
    
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

    let newAsset = new Asset({
         _userId: user._id,
         owner: user.username,
         certificateno: req.body.certificateno,
         propertyId: req.body.propertyId,
         squareMeters: req.body.squareMeters,
         description: req.body.description,
         occupation: req.body.occupation
     }); 

     Asset.addAsset(newAsset, (err, asset)=>{
        if(err){
            //console.log(err);
            res.json({success: false, msg: 'Asset Application Falied '});
        }else{
            res.json({success: true, msg: 'Asset Application successful'});
        }
    });
});

router.post('/approve', passport.authenticate('gov-role', {session:false}),  (req, res, next)=>{
    //Capture the goverment Id from the route passport strategy

    const propertyId = req.body.propertyId;

    console.log(propertyId);
    
    Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
        if(err)throw err;
        if(!asset){
            return  res.json({success:false, message:'Asset not found'});
        }
        // console.log(asset);
        // if (asset.approved) return res.status(400).send({ type: 'already-verified', msg: 'Asset has already been verified.' });
        
        // asset.approved = true;
        // asset.save(function(err){
        //     if(err) {return res.status(500).send({msg: err.message}); }
        //     res.status(200).send("Asset has been verified.");
        // });

        let blockAsset =
        {
            
            propertyId: asset.propertyId,
            address: "string", //Make Array
            squareMeters: asset.squareMeters,
            price: 0,
            imagelink: "string",
            description: asset.description,
            dateOfRegistration: "string",
            landSurveyLink: "string",
            coordinates: [],
            owner: "1029192", //replace with owner username (asset.owner)
            government:"string" // replace with the government (capture from the post req)
            //Add certificateno : "string"
        }
        console.log(blockAsset.propertyId);
        //Add Asset to the blockchain 
        assetCtrl.addAsset(blockAsset);
        console.log(blockAsset.propertyId);
    });
    
    
    

});
module.exports = router;