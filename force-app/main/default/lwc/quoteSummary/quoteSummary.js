import { LightningElement , api, wire, track} from 'lwc';
import getQuotes from '@salesforce/apex/quoteController.getQuotes';
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import whOrderExplorerChannel from '@salesforce/messageChannel/whOrderExplorerChannel__c';

export default class QuoteSummary extends LightningElement {        
    
    @api quotes;
    columns = [
        { label: 'Quote Number', fieldName: 'Name' },
        { label: 'Account Name', fieldName: 'Account_Name__r.Name' },
        { label: 'Total Amount', fieldName: 'Total_Amount__c', type: 'currency' },
        { label: 'Quote Date', fieldName: 'Quote_Date__c' }
    ];

    @track isQuoteSelected = false;

    @wire(getQuotes)
    wiredQuotes({ error, data }) {
        if (data) {
            this.quotes = data;
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
        this.isQuoteSelected = message.radioSelection === 'quote';
    }
}