const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const hyperConfig = require('../config/hyperconfig');
let businessNetworkConnection = new BusinessNetworkConnection();
const cardService = require('../services/cardService');

async function addUser(user) {
    
    

    try {
        let type = 'User';
        let userId = user.userId; //User Id generated at registration
        let username = user.username; //Username generated inputed at registration
        
        let bizNetDefination = await businessNetworkConnection.connect(hyperConfig.networkAdminCard);
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        let participant = factory.newResource(hyperConfig.ns, type, userId);

        participant.username = username;

        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(`${hyperConfig.ns}.${type}`);
        await participantRegistry.add(participant);

         let identity = await businessNetworkConnection.issueIdentity(`${hyperConfig.ns}.${type}#${userId}`, username);
         //'net.biz.digitalPropertyNetwork.Person#mae@biznet.org', 'maeid1'
        console.log(`userID = ${identity.userID}`);
        console.log(`userSecret = ${identity.userSecret}`);

        await cardService.create(identity);
        identity.type = type;
        await businessNetworkConnection.disconnect();
        // //await mongoService.insert(identity)


        //return responseModel.successResponse("Player created", identity);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = {
    addUser
}