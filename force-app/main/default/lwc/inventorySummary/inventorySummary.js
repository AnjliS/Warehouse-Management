import { LightningElement , api, wire, track } from 'lwc';
import getInventory from '@salesforce/apex/inventoryController.getInventory';
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import whOrderExplorerChannel from '@salesforce/messageChannel/whOrderExplorerChannel__c';

export default class InventorySummary extends LightningElement {
    @api inventory;
    columns = [
        { label: 'Inventory Number', fieldName: 'Name' },
        { label: 'Product Name', fieldName: 'Product_Details__r.Name' },
        { label: 'Warehouse Name', fieldName: 'Warehouse__r.Name' },
        { label: 'Opening Stock', fieldName: 'Opening_Stock__c' },
        { label: 'Total Available Stock', fieldName: 'Total_Available_Stock__c' },
        { label: 'Total Invoiced Quantity', fieldName: 'Total_Invoiced_Quantity__c' }
    ];

    @track isInventorySelected = false;

    @wire(getInventory)
    wiredInventory({ error, data }) {
        if (data) {
            this.inventory = data;
            //console.log('Inventory Data:', JSON.stringify(this.inventory));
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
        this.isInventorySelected = message.radioSelection === 'inventory';
    }
}