const hyperConfig = require('../config/hyperconfig');
//const cardService = require('../services/cardService');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let businessNetworkConnection  = new BusinessNetworkConnection();



async function addAsset(assetData) {
        //console.log(assetData);
    try {

        let type = "realEstate";
        let userType = "User";
        let govType = "Government";

        let businessNetDefination = await businessNetworkConnection.connect(hyperConfig.networkAdminCard);
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        let assetRegistry = await businessNetworkConnection.getAssetRegistry(`${hyperConfig.ns}.${type}`);

        let ownerRelations = factory.newRelationship(hyperConfig.ns, userType, assetData.owner);
        let governmentRelations = factory.newRelationship(hyperConfig.ns, govType, assetData.government)
        let newRealEstate = factory.newResource(hyperConfig.ns, type, assetData.propertyId);

        delete assetData.owner;
        delete assetData.government;

        newRealEstate.owner = ownerRelations;
        newRealEstate.government = governmentRelations;


        newRealEstate = Object.assign(newRealEstate, assetData);

        let result = await assetRegistry.add(newRealEstate);

        await businessNetworkConnection.disconnect();
        console.log("succesful");
        //res.json({success: true, msg: 'Your real estate registered'});
    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;
        //res.json({success: true, msg: "Create Real Estate failed"});
    }


}



async function tradeAsset(assetData, userData) {

    try {

        let type = "BuyingRealEstate"
        let userType = "User"
        let assetType = "realEstate"

        let currentOwner = userData;

        // if (!(currentOwner && currentOwner.length)) {
        //     return responseModel.successResponse("Invalid credentials", {});
        // } else {
        //     currentOwner = currentOwner[0];
        // }

        let currentOwnerCard = `${currentOwner.blockUserID}@${hyperConfig.networkName}`;
        let bizNetDefination = await businessNetworkConnection.connect(currentOwnerCard);
        let factory = bizNetDefination.getFactory();

        delete tradeMarbleData.creds;

        let newOwnerRelation = factory.newRelationship(hyperConfig.ns, userType, tradeMarbleData.transactionData.newOwnerEmail);

        let marbleRelation = factory.newRelationship(config.ns, assetType, tradeMarbleData.transactionData.marbleId);

        let transData = {
            "marble": marbleRelation,
            "newOwner": newOwnerRelation
        }


        const newTransaction = factory.newTransaction(`${config.ns}`, type);

        trans = Object.assign(newTransaction, transData);

        let res = await bizNetConnection.submitTransaction(trans);

        return responseModel.successResponse("Marbles traded", res);

    } catch (err) {

        console.log("in err");

        errMessage = typeof err == 'string' ? err : err.message;

        return responseModel.failResponse("Transaction", {}, errMessage);
    }


}




module.exports = {
    addAsset,
    tradeAsset
}