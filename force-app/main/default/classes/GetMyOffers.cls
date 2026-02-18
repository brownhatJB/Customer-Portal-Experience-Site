/*******************************************************
 * File: GetMyOffers.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: This class is used for retrieving the data of each customer's offers.
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

public without sharing class GetMyOffers {
    @AuraEnabled(cacheable = true)
    public static List<Offer__c> getMyOffers() {
        User u = [ 
                    SELECT ContactId
                    FROM user 
                    WHERE Id =: UserInfo.getUserId()
                    LIMIT 1
                ];
        List<Offer__c> offers = [ 
                                    SELECT CreatedDate, Name, Unit__r.Name, Unit_Price__c 
                                    FROM Offer__c
                                    WHERE Contact__c =: u.ContactId
                                    ORDER BY CreatedDate DESC
                                ];
        return offers;
    }
}