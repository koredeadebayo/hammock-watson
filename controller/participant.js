const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const hyperConfig = require('../config/hyperconfig');
const connectionoptions = require('../config/connectionOpt');
let businessNetworkConnection = new BusinessNetworkConnection(connectionoptions);
const cardService = require('../services/cardService');
const response = require('../services/response');

console.log(businessNetworkConnection);

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
         
        console.log(`userID = ${identity.userID}`);
        console.log(`userSecret = ${identity.userSecret}`);
        
        //Add the above Card Details to the user
        user.blockUserID = identity.userID;
        //console.log(user);
        user.blockUserSecret = identity.userSecret; 
        user.save();

        let result = await businessNetworkConnection.ping();
        console.log(`participant = ${result.participant ? result.participant : '<no participant found>'}`);
        //let result = await cardService.create(identity);
        identity.type = type;
        //console.log(result)
        await businessNetworkConnection.disconnect();
        // //await mongoService.insert(identity)



        //return responseModel.successResponse("Player created", identity);
    } catch(error) {
        console.error(error);
        return response.failResponse(error);
        //process.exit(1);
    }
}
 
async function addGov(gov) {
    
    console.log(gov);

    try {
        let type = 'Government';
        let govId = gov.govId; //Government Id generated at registration
        let name = gov.name; //Username generated inputed at registration
        let govRate = gov.govRate;
    
        
        let bizNetDefination = await businessNetworkConnection.connect(hyperConfig.networkAdminCard);
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();

        let participant = factory.newResource(hyperConfig.ns, type, govId);

        participant.name = name;
        participant.govRate = govRate;


        let participantRegistry = await businessNetworkConnection.getParticipantRegistry(`${hyperConfig.ns}.${type}`);
        await participantRegistry.add(participant);

         let identity = await businessNetworkConnection.issueIdentity(`${hyperConfig.ns}.${type}#${govId}`, name);
         //'net.biz.digitalPropertyNetwork.Person#mae@biznet.org', 'maeid1'
        console.log(`userID = ${identity.userID}`);
        console.log(`userSecret = ${identity.userSecret}`);

        gov.blockUserID = identity.userID;
        //console.log(user);
        gov.blockUserSecret = identity.userSecret; 
        gov.save();

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
    addUser,
    addGov
}