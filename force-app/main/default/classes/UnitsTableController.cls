/*******************************************************
 * File: UnitsTableController.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: This class is used for retrieving available units and expose these to customer portal.
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

public without sharing class UnitsTableController {
    @AuraEnabled(cacheable = true)
    public static List<Units__c> getAvailableUnits(String unitType){
        String query = 'SELECT Name, Type__c, Total_Area__c, Bedrooms__c, Unit_Price__c, Floor_Plan__c FROM Units__c WHERE Status__c = \'Available\'';

        if(String.isNotBlank(unitType) && unitType != 'All'){
            query += ' AND Type__c =: unitType';
        }

        query += ' ORDER BY CreatedDate DESC';

        return Database.query(query);
    }
}