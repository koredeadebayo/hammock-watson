const hyperConfig = require('../config/hyperconfig');
const IdCard = require('composer-common').IdCard;
const AdminConnection = require('composer-admin').AdminConnection;
const fs = require('fs');
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const WalletBackedCardStore = require('composer-common').WalletBackedCardStore;
const adminConnection = new AdminConnection();
//console.log(adminConnection);

async function create(identity) {

    const metadata = {
        userName: identity.userID,
        version: 1,
        enrollmentSecret: identity.userSecret,
        businessNetwork: hyperConfig.networkName,
        description: identity.userID + "'s identity",
    };
    let bizNetDefination = await adminConnection.connect(hyperConfig.networkAdminCard);
    console.log(identity);
    
    const idCardData = new IdCard(metadata, hyperConfig.connectionProfile);
    const idCardName = BusinessNetworkCardStore.getDefaultCardName(idCardData);

    await adminConnection.importCard(idCardName, idCardData);
    //let userCardDir = `${hyperConfig.cardDir}/${metadata.userName}@${metadata.businessNetwork}`;
    //console.log(userCardDir);
    //await idCardData.toDirectory(userCardDir, fs);

    return;

}
// const CardCreate = require('composer-cli').Card.Create;
// const CardImport = require('composer-cli').Card.Import;
// const hyperConfig = require('../config/hyperconfig');


// async function create(identity) {
    

//         let metadata = { 
//         file: `card/${identity.userID}.card`,
//         businessNetworkName: hyperConfig.networkName,
//         connectionProfileFile: hyperConfig.connectionProfile,
//         user: identity.userID,
//         enrollSecret: identity.userSecret
//         };

//        CardCreate.handler(metadata);

        
//         let options = {
//         file: metadata.file,
//         card: `${metadata.user}@${hyperConfig.networkName}`
//         };

//         CardImport.handler(options);

// }

module.exports = {
    create
}