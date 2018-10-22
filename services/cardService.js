const hyperConfig = require('../config/hyperconfig');
const IdCard = require('composer-common').IdCard;
const fs = require('fs');
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const WalletBackedCardStore = require('composer-common').WalletBackedCardStore;


// 'use strict';

// const idCardClass = require('composer-common').IdCard;

// let metadata = {version: 1, userName: 'muntasir',enrollmentSecret: "abcarete",businessNetwork: "mybusiness"};
// let connectionprofile =  { name: 'hlfv1',
//                           type: 'hlfv1',
//                           orderers: [ { url: 'grpc://localhost:7050' } ],
//                           ca: { url: 'http://localhost:7054', name: 'ca.org1.example.com' },
//                           peers: 
//                            [ { requestURL: 'grpc://localhost:7051',
//                                eventURL: 'grpc://localhost:7053' } ],
//                           channel: 'composerchannel',
//                           mspID: 'Org1MSP',
//                           timeout: 300 };

// const newIdCard =new idCardClass(metadata,connectionprofile);

// newIdCard.toDirectory('/home/muntasir/.composer/cards/muntasir@mybusiness').then(function(){
//     console.log('new card created');
// });

async function create(identity) {

    const metadata = {
        userName: identity.userID,
        version: 1,
        enrollmentSecret: identity.userSecret,
        businessNetwork: hyperConfig.networkName,
        description: identity.userID + "'s identity",
    };


    const idCardData = new IdCard(metadata, hyperConfig.connectionProfile);
    const idCardName = BusinessNetworkCardStore.getDefaultCardName(idCardData);

    let userCardDir = `${hyperConfig.cardDir}/${metadata.userName}@${metadata.businessNetwork}`;
    console.log(userCardDir);
    await idCardData.toDirectory(userCardDir, fs);

    return;

}



module.exports = {
    create
}