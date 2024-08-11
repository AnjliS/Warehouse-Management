import { LightningElement , api, wire, track} from 'lwc';
import getInvoices from '@salesforce/apex/InvoiceController.getInvoices';
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import whOrderExplorerChannel from '@salesforce/messageChannel/whOrderExplorerChannel__c';

export default class InvoiceSummary extends LightningElement {
    @api invoices;
    columns = [
        { label: 'Invoice Number', fieldName: 'Name' },
        { label: 'Account Name', fieldName: 'Account_Name__c' },
        { label: 'Total Amount', fieldName: 'Total_Amount__c', type: 'currency' },
        { label: 'Invoice Date', fieldName: 'Invoice_Date__c' },
        { label: 'Salesorder Name', fieldName: 'Salesorder_Name__c' },
        { label: 'Warehouse', fieldName: 'Warehouse__c' }
    ];

    @track isInvoiceSelected = false;

    @wire(getInvoices)
    wiredInvoices({ error, data }) {
        if (data) {
            this.invoices = data;
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
        this.isInvoiceSelected = message.radioSelection === 'invoice';
    }
}