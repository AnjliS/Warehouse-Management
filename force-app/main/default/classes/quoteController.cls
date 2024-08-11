public with sharing class quoteController {
    @AuraEnabled(cacheable=true)
    public static List<CQuote__c> getQuotes() {
        return [SELECT Account_Name__r.Name , Contact_Name__c , Name , Opportunity_Name__c , Payment_Terms__c , 
        Quote_Date__c , Total_Amount__c, Valid_Till__c , Warranty__c  FROM CQuote__c];
    }
}