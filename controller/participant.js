const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const hyperConfig = require('../config/hyperconfig');
let businessNetworkConnection = new BusinessNetworkConnection();

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
        //connect to business network using the admin card
        //await businessNetworkConnection.connect(hyperConfig.networkAdminCard);
        //console.log(hyperConfig);
        //instantiate participant registry
        //let participantRegistry = await businessNetworkConnection.getParticipantRegistry(hyperConfig.ns);
        //let factory = businessNetworkConnection.getFactory();
        
        //let participant = factory.newResource('org.hammock.network', 'User', userId);
        //participant.username = username;
        //console.log(participant.username)
        //await participantRegistry.add(participant);
        //await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = {
    addUser
}