/*
    Asset Management 
*/

const express = require('express');
const Asset = require('../models/asset');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

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
router.post('/add', passport.authenticate('user-role', {session:false}), (req, res, next)=>{
    let user = req.user;
    //console.log(user);
    
    let newAsset = new Asset({
         _userId: user._id,
         certifcateno: req.body.certifcateno,
         assetId: req.body.assetId,
         squaremeter: req.body.squaremeter,
         description: req.body.description,
         occupation: req.body.occupation
     });

     Asset.addAsset(newAsset, (err, asset)=>{
        if(err){
            res.json({success: false, msg: 'Asset Application Falied '});
        }else{
            res.json({success: true, msg: 'Asset Application successful'});
        }
    });
    //await assetCtrl.addRealEstate(req.body);
    //res.json({success: true, msg: "Your Real Estate was successfully added"})
});

module.exports = router;