/*******************************************************
 * File: GetMyEnquiries.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: This class is used for retrieving the data of each customer's enquiries ie leads.
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

public without sharing class GetMyEnquiries {
    @AuraEnabled(cacheable = true)
    public static List<Lead> getMyEnquiries() {
        User u = [ 
                    SELECT ContactId, Email 
                    FROM user 
                    WHERE id =: UserInfo.getUserId() 
                    LIMIT 1
                ];

        List<lead> leads = [ 
                                SELECT CreatedDate, Name 
                                FROM Lead 
                                WHERE Contact__c =: u.ContactId
                                ORDER BY CreatedDate DESC
                            ];
        return leads;

    }
}