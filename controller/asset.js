const hyperConfig = require('../config/hyperconfig');
//const cardService = require('../services/cardService');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let businessNetworkConnection  = new BusinessNetworkConnection();



async function addRealEstate(realEstateData) {

    try {

        let type = "RealEstate";
        let userType = "User";

        let businessNetDefination = await businessNetworkConnection.connect(realEstateData.usercard);
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        let assetRegistry = await businessNetworkConnection.getAssetRegistry(`${hyperConfig.ns}.${type}`);

        let ownerRelations = factory.newRelationship(hyperConfig.ns, userType, realEstateData.owner);
        let newRealEstate = factory.newResource(hyperConfig.ns, type, realEstateData.assetId);

        delete realEstateData.owner;

        newRealEstate.owner = ownerRelations;

        newRealEstate = Object.assign(newRealEstate, realEstateData);

        let result = await assetRegistry.add(newRealEstate);

        await businessNetworkConnection.disconnect();
        res.json({success: true, msg: 'Your real estate registered'});
    } catch (err) {

        errMessage = typeof err == 'string' ? err : err.message;
        res.json({success: true, msg: "Create Real Estate failed"});
    }


}

module.exports = {
    addRealEstate
}