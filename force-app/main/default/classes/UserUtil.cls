/*******************************************************
 * File: GetMyEnquiries.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 16-02-2026
 * Description: This class is used for retrieving current user type.
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

public without sharing class UserUtil {
    @AuraEnabled(cacheable=true)
    public static String getUserType() {
        return UserInfo.getUserType();
    }
}