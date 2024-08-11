import { LightningElement, wire, track } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import whOrderExplorerChannel from '@salesforce/messageChannel/whOrderExplorerChannel__c';

export default class OrderExplorerPageHeader extends LightningElement {
    @track selectedValue = '';

    get options() {  
        return [
            { label: 'Quotes', value: 'quote' },
            { label: 'Sales Order', value: 'salesorder' },
            { label: 'Invoice', value: 'invoice' },
            { label: 'Inventory', value: 'inventory' }
        ];
    }

    @wire(MessageContext)messageContext;
    handleSelection(event){
        this.selectedValue = event.target.value;

        //code to pass message to channel
        let payload = {radioSelection : this.selectedValue};
        publish(this.messageContext, whOrderExplorerChannel, payload);
    }
}