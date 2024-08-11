import { LightningElement, track } from 'lwc';

import saveRecord from '@salesforce/apex/CreateAccConOppController.saveRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccConOpp extends LightningElement {
    @track accountName;
    @track parentAccountId;
    @track accountPhone;
    @track accountWebsite;
    @track accountIndustry;
    @track accountDescription;
    @track accountEmployees;
    @track accountRevenue;
    @track billingStreet;
    @track shippingStreet;
    @track billingCity;
    @track shippingCity;
    @track billingState;
    @track shippingState;
    @track billingCountry;
    @track shippingCountry;
    @track billingPostalCode;
    @track shippingPostalCode;

    @track contactSalutation;
    @track contactFirstName;
    @track contactLastName;
    @track contactTitle;
    @track contactPhone;
    @track contactMobilePhone;
    @track contactEmail;

    @track opportunityLeadSource;
    @track opportunityOtherLeadSource;
    @track opportunityStage;
    @track opportunityRemarks;

    handleInputChange(event) {
        this[event.target.name] = event.target.value;
    }

    handleSave() {
        const acc = {
            Name: this.accountName,
            ParentId: this.parentAccountId,
            Phone: this.accountPhone,
            Website: this.accountWebsite,
            Industry: this.accountIndustry,
            Description: this.accountDescription,
            NumberOfEmployees: this.accountEmployees,
            AnnualRevenue: this.accountRevenue,
            BillingStreet: this.billingStreet,
            ShippingStreet: this.shippingStreet,
            BillingCity: this.billingCity,
            ShippingCity: this.shippingCity,
            BillingState: this.billingState,
            ShippingState: this.shippingState,
            BillingCountry: this.billingCountry,
            ShippingCountry: this.shippingCountry,
            BillingPostalCode: this.billingPostalCode,
            ShippingPostalCode: this.shippingPostalCode,
        };

        const con = {
            Salutation: this.contactSalutation,
            FirstName: this.contactFirstName,
            LastName: this.contactLastName,
            Title: this.contactTitle,
            Phone: this.contactPhone,
            MobilePhone: this.contactMobilePhone,
            Email: this.contactEmail,
        };

        const opc = {
            Name: this.opportunityLeadSource,
            CloseDate: this.opportunityOtherLeadSource,
            Stage: this.opportunityStage,
            Remarks: this.opportunityRemarks,
        };

        saveRecord({ acc, con, opc })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Records created successfully',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating records',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    handleCancel() {
        // Handle the cancel action (e.g., clear the form or navigate away)
    }
}
