/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */


/**
 * Buying Real Estate
 * @param {org.hammock.network.BuyingRealEstate} trade
 * @transaction
 */

function buyingRealEstate(trade){
    var transferCharges = (trade.government.govRate/100) * trade.realEstate.price
    var totalCost = transferCharges + trade.realEstate.price 
   
  
    // Check if the buyer has enough to pay the notary, real estate agent and insurance
    if( trade.buyer.balance < totalCost ){
      throw new Error('Not enough funds to buy this!')
    }
    //deducated price of property from the buyer
    trade.buyer.balance -= totalCost
    //set the owner of the property to buyer
    trade.realEstate.owner = trade.buyer
    //pay Government fee
    trade.government.balance += transferCharges
    // Updates the seller's balance
    trade.seller.balance += trade.realEstate.price
  
    Promise.all([
      getAssetRegistry('org.hammock.network.realEstate'),
      getParticipantRegistry('org.hammock.network.User'),
      getParticipantRegistry('org.hammock.network.User'),
      getParticipantRegistry('org.hammock.network.Government')
    ]).then(function(registries){
      return (
        registries[0].update(trade.realEstate),
        registries[1].update(trade.seller),
        registries[2].update(trade.buyer),
        registries[3].update(trade.government)
      )
    })
  }

  