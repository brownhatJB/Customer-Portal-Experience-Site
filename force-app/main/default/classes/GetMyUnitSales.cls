/*******************************************************
 * File: GetMyUnitSales.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: This class is used for retrieving the data of each customer's unit_sale details.
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

public without sharing class GetMyUnitSales {

    public class UnitSaleWrapper {
        @AuraEnabled public Unit_Sale__c unitSale;
        @AuraEnabled public List<Payment_Plan_Item__c> paymentItems;
        @AuraEnabled public List<Invoice__c> invoices;
        @AuraEnabled public List<Receipt__c> receipts;

        public UnitSaleWrapper(Unit_Sale__c sale) {
            unitSale = sale;
            paymentItems = sale.Payment_Plan_Item__r != null ? sale.Payment_Plan_Item__r : new List<Payment_Plan_Item__c>();
            invoices = sale.Invoices__r != null ? sale.Invoices__r : new List<Invoice__c>();
            receipts = sale.Receipts__r != null ? sale.Receipts__r : new List<Receipt__c>();
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<UnitSaleWrapper> getUnitSales() {

        User u = [
            SELECT ContactId
            FROM User
            WHERE Id =: UserInfo.getUserId()
        ];

        List<Unit_Sale__c> sales = [
            SELECT Id, Name, 
                   Project__r.Name, 
                   Property__r.Name, 
                   Unit__r.Name, 
                   Primary_Contact__r.Name,
                   Status__c, 
                   Unit_Price__c, 
                   CreatedDate,
                   (SELECT Id, Name, Actual_Due_Date__c, Payment_Plan_Item_Name__c, Amount__c, Status__c
                    FROM Payment_Plan_Item__r
                    ORDER BY Payment_Plan_Item_Name__c),
                    (SELECT Id, Name, Invoice_Date__c, Payment_Plan_Item__r.Payment_Plan_Item_Name__c, Total_Amount_Excluding_Tax__c, Tax_Value__c, Invoice_Amount__c 
                    FROM Invoices__r
                    ORDER BY Payment_Plan_Item__r.Payment_Plan_Item_Name__c),
                    (SELECT Id, Name, Amount__c, Mode__c, Receipt_Date__c, Receipt_Voucher_No__c 
                    FROM Receipts__r
                    ORDER BY Name )
            FROM Unit_Sale__c
            WHERE Primary_Contact__c =: u.ContactId
        ]; 

        List<UnitSaleWrapper> result = new List<UnitSaleWrapper>();

        for(Unit_Sale__c sale : sales){
            result.add(new UnitSaleWrapper(sale));
        }

        return result;
    }
}