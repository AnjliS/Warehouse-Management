public with sharing class testCreateAccInLwcClass {
    @AuraEnabled
    /*
    public static void testCreateAcc(Account acc){
        Account ac = new Account();
        ac.Name = acc.aNm;
        ac.Email__c = acc.em;
        ac.Phone = acc.ph;
        insert ac;
    } */
     
    public static void testCreateAcc(String aNm , String em , String ph){
        Account ac = new Account();
        ac.Name = aNm;
        ac.Email__c = em;
        ac.Phone = ph;
        insert ac;
    } 
}