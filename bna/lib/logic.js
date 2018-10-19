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

function buyingRealEstate( trade ){
    var notaryFees = trade.notary.reassignCost + (trade.realEstate.price *trade.notary.notaryRate)
    var agentFees = trade.realEstateAgent.feeRate * trade.realEstate.price
    var totalCost = notaryFees + agentFees 
   
  
    // Check if the buyer has enough to pay the notary, real estate agent and insurance
    if( trade.buyer.balance < totalCost ){
      throw new Error('Not enough funds to buy this!')
    }
    //deducated price of property from the buyer
    trade.buyer.balance -= totalCost
    //set the owner of the property to buyer
    trade.realEstate.owner = trade.buyer
    //pay agent fee
    trade.realEstateAgent.balance += agentFees
    //pay notary(government) fee
    trade.notary.balance += notaryFees
    // Updates the seller's balance
    trade.seller.balance += trade.realEstate.price
  
    Promise.all([
      getAssetRegistry('org.hammock.network.realEstate'),
      getParticipantRegistry('org.hammock.network.User'),
      getParticipantRegistry('org.hammock.network.User'),
      getParticipantRegistry('org.hammock.network.Notary'),
      getParticipantRegistry('org.hammock.network.agent')
    ]).then(function(registries){
      return (
        registries[0].update(trade.realEstate),
        registries[1].update(trade.seller),
        registries[2].update(trade.buyer),
        registries[3].update(trade.notary),
        registries[4].update(trade.realEstateAgent)
      )
    })
  }

  