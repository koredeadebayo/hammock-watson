const hyperConfig = require('../config/hyperconfig');
//const cardService = require('../services/cardService');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let businessNetworkConnection  = new BusinessNetworkConnection();



async function addAsset(assetData) {
        //console.log(assetData);
    try {

        // let type = "Marble";
        // let userType = "Player";

        // let bizNetDefination = await bizNetConnection.connect(config.networkAdminCard);
        // let factory = bizNetConnection.getBusinessNetwork().getFactory();

        // let assetRegistry = await bizNetConnection.getAssetRegistry(`${config.ns}.${type}`);

        // let ownerRelations = factory.newRelationship(config.ns, userType, marbleData.owner);
        // let newMarble = factory.newResource(config.ns, type, marbleData.marbleId);

        // delete marbleData.owner;

        // newMarble.owner = ownerRelations;

        // newMarble = Object.assign(newMarble, marbleData);

        // let res = await assetRegistry.add(newMarble);

        // return responseModel.successResponse("Marble added", res);


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

module.exports = {
    addAsset
}