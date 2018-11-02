const hyperConfig = require('../config/hyperconfig');
//const cardService = require('../services/cardService');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let businessNetworkConnection  = new BusinessNetworkConnection();



async function addAsset(assetData) {
        console.log(assetData);
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

        //console.log("on the way");
        newRealEstate = Object.assign(newRealEstate, assetData);

        let result = await assetRegistry.add(newRealEstate);
        //console.log(result);
        await businessNetworkConnection.disconnect();
        console.log("succesful");
        //res.json({success: true, msg: 'Your real estate registered'});
    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;
        //res.json({success: true, msg: "Create Real Estate failed"});
    }


}



async function tradeAsset(transferData) {

    console.log(transferData);
    try {

        let type = "BuyingRealEstate"
        let userType = "User"
        let govType = "Government"
        let assetType = "realEstate"

        let currentOwner = transferData;

        // if (!(currentOwner && currentOwner.length)) {
        //     return responseModel.successResponse("Invalid credentials", {});
        // } else {
        //     currentOwner = currentOwner[0];
        // }

        

        let currentOwnerCard = `${transferData.userID}@${hyperConfig.networkName}`;
        let bizNetDefination = await businessNetworkConnection.connect(currentOwnerCard);
        let factory = bizNetDefination.getFactory();

        delete transferData.blockUserID;
        //delete transferData.userID;

        let currentOwnerRelation = factory.newRelationship(hyperConfig.ns, userType, transferData.Id);
        let newOwnerRelation = factory.newRelationship(hyperConfig.ns, userType, transferData.buyer);

        let assetRelation = factory.newRelationship(hyperConfig.ns, assetType, transferData.propertyId);
        let govRelation = factory.newRelationship(hyperConfig.ns, govType, transferData.govId); 

        let transData = {
            //"$class": "org.hammock.network.BuyingRealEstate",
            "seller": currentOwnerRelation,
            "buyer": newOwnerRelation,
            "government": govRelation,
            "realEstate": assetRelation,
            //"transactionId": "",
            //timestamp: Date.now()
        }
        //console.log(transData);


        const newTransaction = factory.newTransaction(`${hyperConfig.ns}`, type);

        
        trans = Object.assign(newTransaction, transData);
        
        let res = await businessNetworkConnection.submitTransaction(trans);
        
        console.log(res);

    } catch (err) {

        console.log("in err");

        errMessage = typeof err == 'string' ? err : err.message;

        console.log(err);
    }


}


async function updateAsset(assetData){
    try{

        let businessNetDefination = await businessNetworkConnection.connect(hyperConfig.networkAdminCard);
        assetRegistry = await businessNetworkConnection.getAssetRegistry('org.hammock.network.realEstate')
        asset = await assetRegistry.get(assetData.propertyId);
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        
        asset.price = assetData.price;
        console.log(asset);
        assetRegistry.update(asset);



    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = {
    addAsset,
    tradeAsset,
    updateAsset
}