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
    const gov = req.body.name;

    console.log(propertyId);

    Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
        if(err)throw err;
        if(!asset){
            return  res.json({success:false, message:'Asset not found'});
        }


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
        res.json({success: true, msg: 'Registration Successful Listed'});
        //console.log(blockAsset.propertyId);
    });
    
    

});
//
router.get('/list', passport.authenticate('user-role', {session:false}), async (req, res) => {
        //List all approve properties     
        Asset.find({approved:true}, function(err, assets) {
            if (err) throw err;
            res.json({success: true, msg: assets});
        });

});

router.post('/list/:government', passport.authenticate('user-role', {session:false}), async (req, res) => {
    
    const gov = req.params.government;

    Asset.find({approved:true, government:gov}, function(err, assets){
        if (err) throw err;
        res.json({succes: true, msg: assets});
    });

});

//Government Listing the Properties in their Region
router.get('/list/:owner', passport.authenticate('gov-role', {session:false}), async (req, res) => {
    const gov = req.body.name;   
    console.log(req.body);
    const owner = req.params.owner;

    Asset.find({approved:true, owner:owner, government:gov}, function(err, assets){
        if (err) throw err;
        res.json({succes: true, msg: assets});
    });

});







        /* {
        *	"creds": {
        *		"userID":"fnameP3",
        *		"userSecret":"IXFZZIqXUmmM"
        * },
        *	"transactionData":
        * {
        *		"marbleId": "m2",
        *		"newOwnerEmail": "player4@gmail.com"
        * }
        */

router.post('/tradeAsset', passport.authenticate('user-role', {session:false}), async (req, res) => {
    const buydetail = {
        username: req.body.username,
        land: req.body.User
    }
    user = req.user;

    let result = await assetCtrl.tradeAsset(req.body, user);

    //res.status(result.code).send(result);

});
    
module.exports = router;