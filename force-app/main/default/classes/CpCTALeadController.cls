/*******************************************************
 * File: GetMyEnquiries.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 17-02-2026
 * Description: This class is used for inserting leads.
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

public without sharing class CpCTALeadController {
    @AuraEnabled
    public static Id createLead(String firstName, String lastName, String email, String phone, String company, String description) {
        Lead l = new Lead();
        l.FirstName = firstName;
        l.LastName = lastName;
        l.Email = email;
        l.Phone = phone;
        l.Company = String.isBlank(company) ? 'Customer Portal Enquiry' : company;
        l.Description = description;
        l.LeadSource = 'Website';

        if(UserInfo.getUserType() != 'Guest') {
            User u = [SELECT ContactId 
                      FROM User
                      WHERE User.Id =: UserInfo.getUserId()
                      LIMIT 1];

            l.Contact__c = u.ContactId;
        }

        insert l;

        return l.Id;
    }
}