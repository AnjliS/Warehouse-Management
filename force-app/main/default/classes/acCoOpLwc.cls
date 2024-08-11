public with sharing class acCoOpLwc {
    @AuraEnabled
    public static void acCoOpLwc( Account acc , Contact con , COpportunity__c opp) {

        Account ac = new Account();
        ac.Name = acc.Name;
        ac.Email__c = acc.Email__c;
        ac.Phone = acc.Phone;
        insert ac;

        Contact co = new Contact();
        co.AccountId = ac.Id;
        co.LastName = con.LastName;
        insert co;

        COpportunity__c op = new COpportunity__c();
        op.Account_Name__c = ac.Id;
        op.Contact_Name__c = co.Id;
        op.Stage__c = opp.Stage__c;
        insert op;
    }
}