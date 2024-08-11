import { LightningElement , api, wire, track } from 'lwc';
import getOrders from '@salesforce/apex/salesOrderController.getOrders';
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import whOrderExplorerChannel from '@salesforce/messageChannel/whOrderExplorerChannel__c';

export default class SalesOrderSummary extends LightningElement {
    @api orders;
    columns = [
        { label: 'SalesOrder Number', fieldName: 'Name' },
        { label: 'Account Name', fieldName: 'Account_Name__c' },
        { label: 'Total Amount', fieldName: 'Total_Amount__c', type: 'currency' },
        { label: 'Salesorder Date', fieldName: 'Salesorder_Date__c' }
    ];

    @track isSalesOrderSelected = false;

    @wire(getOrders)
    wiredOrders({ error, data }) {
        if (data) {
            this.orders = data;
        } else if (error) {
            console.error(error);
        }
    }

    
    subscription=null;
    @wire(MessageContext)messageContext;
    connectedCallback(){
        this.handleSubscribe();
    }

    disconnectedCallback(){
        this.handleUnsubscribe();
    }

    handleSubscribe(){
        if(!this.subscription){
            this.subscription = subscribe(this.messageContext, whOrderExplorerChannel, 
                (message)=>{
                    this.handleMessage(message);
                }
            )
        }
    }

    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription=null;
    }

    handleMessage(message) {
        this.isSalesOrderSelected = message.radioSelection === 'salesorder';
    }
}