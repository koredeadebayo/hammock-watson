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
const TradeRequest = require('../models/traderequest');
const randomstring = require('randomstring');

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
    const newpropertyId = randomstring.generate(12);
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
         propertyId: newpropertyId,
         squareMeters: req.body.squareMeters,
         description: req.body.description,
         occupation: req.body.occupation,
         government: req.body.government
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
    //Capture the goverment Id from the route passport 
    const gov = req.user.name;

    const propertyId = req.body.propertyId;
    
    //console.log(req.user.name);


    Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
        if(err)throw err;
        if(!asset){
            return  res.json({success:false, message:'Asset not found'});
        }
        asset.approved = true;
        asset.government = gov;
        asset.save();
        const owner = asset.owner;
         
        User.getUserByUsername(owner, (err, user)=>{
            if (err) throw err;
            let userId = user.userId;
            Gov.getGovByName(gov, (err, government)=>{
                if(err) throw err;
                
                govId = government.govId;

                let blockAsset ={
                    propertyId: asset.propertyId,
                    address: [], //Make Array
                    squareMeters: asset.squareMeters,
                    price: 0,
                    description: asset.description,
                    dateOfRegistration: "Todays date",
                    coordinates: [],
                    owner: userId, //replace with owner username (asset.owner)
                    government:govId, // replace with the government (capture from the post req)
                    certificateno : asset.certificateno
                }
            //console.log(blockAsset.propertyId);
            //Add Asset to the blockchain 
            assetCtrl.addAsset(blockAsset);
            }) 
            

        });

        
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
        res.json({success: true, msg: assets});
    });

});

//Government Listing the Properties in their Region
router.get('/list/:owner', passport.authenticate('gov-role', {session:false}), async (req, res) => {
    res.json({gov:req.user.name});
    const owner = req.params.owner;

    Asset.find({approved:true, owner:owner, government:gov}, function(err, assets){
         if (err) throw err;
         res.json({success: true, msg: assets});
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
router.post('/makeforsale', passport.authenticate('user-role', {session:false}), async (req, res) => {
   let owner = req.user.username;
   let propertyId = req.body.propertyId;
   let price = req.body.price;

   Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
    if(err)throw err;
    if(!asset){
        return  res.json({success:false, message:'Asset not found'});
    }
    if (!asset.approved){
        return res.json({success:false, message:"Property is not approved"});
    }
    if(asset.owner !== owner){
        return res.json({success:false, message:"Unauthorized"})
    }
    if(asset.forsale){
        return res.json({success: false, message:"Property is already listed for sale"});
    }else{
        asset.forsale = true;
        asset.price = price;
        asset.save();
        return res.json({success: true, message:"Success! Property is listed for sale"});
    }
            
   });
});

router.post('/makerequest', passport.authenticate('user-role', {session:false}), async (req, res) => {
    let propertyId = req.body.propertyId;
    let buyer = req.user.name;
    const price = req.body.price;

    Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
        if(err)throw err;
        if(!asset){
            return res.json({success: false, msg:"Asset not found"});
        }
        if(!asset.approved){
            return res.json({success: false, msg:"Asset not approved"});
        }
 
        

        let newTradeRequest = new TradeRequest({
            buyer: buyer,
            price: price,
            propertyId: propertyId
        });


        TradeRequest.addTradeRequest(newTradeRequest, (err,TradeRequest)=>{
                if(err){
                    console.log(err);
                    res.json({success: false, msg: 'Request Falied '});
                }else{
                    res.json({success: true, msg: 'Request successful'});
                }
        });
    });

    //res.status(result.code).send(result);

});


router.post('/acceptrequest', passport.authenticate('user-role', {session:false}), async (req, res) => {
    const owner = req.user.username;
    //console.log(owner);
    const propertyId = req.body.propertyId;


    Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
        if(err) throw err;
        //console.log(asset.owner);
        if(!asset){
            res.json({success: false, msg: "Property not found!"});
        }  
        if(!asset.approved){
            res.json({success: false, msg: "Trade not allowed, Property not approved"});
        }
        if(asset.owner !== owner){
            console.log(asset.owner);

            console.log(owner);
            res.json({success: false, msg:"Trade not allowed"});
        }
        

        TradeRequest.getTradeRequestByPropertyId(propertyId, (err, tradeRequest)=>{
            console.log(tradeRequest.accepted);
            if (err) throw err;
            asset.price = tradeRequest.price;
            asset.save(); 
            console.log(tradeRequest.price)
            tradeRequest.accepted = true;
            tradeRequest.save();
            res.json({success: true, msg:"Trade Accepted"});
            assetCtrl.updateAsset(asset);
        });

        
       
    });
});

router.post('/rejectrequest', passport.authenticate('user-role', {session:false}), async (req, res) => {
    const owner = req.user.username;
    //console.log(owner);
    const propertyId = req.body.propertyId;


    Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
        if(err) throw err;
        //console.log(asset.owner);
        if(!asset){
            res.json({success: false, msg: "Property not found!"});
        }  
        if(!asset.approved){
            res.json({success: false, msg: "Not allowed, Property not approved"});
        }
        if(asset.owner !== owner){
            console.log(asset.owner);

            console.log(owner);
            res.json({success: false, msg:"Not allowed"});
        }
        

        TradeRequest.getTradeRequestByPropertyId(propertyId, (err, tradeRequest)=>{
            console.log(tradeRequest.accepted);
            if (err) throw err;
            asset.price = tradeRequest.price;
            asset.save(); 
            tradeRequest.rejected = true;
            tradeRequest.save();
            res.json({success: true, msg:"Trade Rejected"});
        });
    });
});



router.post('/transferasset', passport.authenticate('user-role', {session:false}), async (req, res)=>{
    const owner = req.user.username;

    User.getUserByUsername(owner, (err, user)=>{
        if (err) throw err;
        console.log(user);
        const Id = user.userId;
        const userID = user.blockUserID;
        const userSecret = user.blockUserSecret;
;
        const propertyId = req.body.propertyId;
        const buyer = req.body.buyer;
        User.getUserByUsername(buyer, (err, user)=>{
            if (err) throw err;
            const buyerId = user.userId;

            Asset.getAssetByPropertyId(propertyId, (err, asset)=>{
                if (err) throw err;

                const gov = asset.government;
                Gov.getGovByName(gov, (err, gov)=>{
                    if (err) throw err;

                    const govId = gov.govId;

                    let transferData = {
                        Id: Id,
                        userID: userID,
                        userSecret: userSecret,
                        propertyId: req.body.propertyId,
                        buyer: buyerId,
                        govId: govId
                    }
            
                    assetCtrl.tradeAsset(transferData);
                });
               
                

            }); 
        });

    });
});


module.exports = router;