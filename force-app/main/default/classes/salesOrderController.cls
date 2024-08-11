public with sharing class salesOrderController {
    @AuraEnabled(cacheable=true)
    public static List<CSalesorder__c> getOrders() {
        return [select Account_Name__c , Contact_Name__c , Name , Opportunity_Name__c , Payment_Terms__c , 
        Quotation_Name__c , Salesorder_Date__c , Total_Amount__c, Valid_Till__c , Warranty__c  from CSalesorder__c];
    }
}