public with sharing class invoiceController {
    @AuraEnabled(cacheable=true)
    public static List<CInvoice__c> getInvoices() {
        return [SELECT Account_Name__c , Contact_Name__c , Name , Opportunity_Name__c , Payment_Terms__c , Salesorder_Name__c ,
        Warehouse__c , Quotation_Name__c , Invoice_Date__c , Total_Amount__c, Valid_Till__c , Warranty__c  FROM CInvoice__c];
    }
}