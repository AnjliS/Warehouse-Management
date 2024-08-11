public with sharing class inventoryController {
    @AuraEnabled(cacheable=true)
    public static List<CInventory__c> getInventory() {
        return [SELECT Warehouse__r.Name , Name , Product_Details__r.Name , Opening_Stock__c , 
        Total_Available_Stock__c , Total_Invoiced_Quantity__c  FROM CInventory__c];
    }
}