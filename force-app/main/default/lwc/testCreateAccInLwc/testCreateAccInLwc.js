import { LightningElement , api , track} from 'lwc';

//import { AcName, emailid    } from './importFields';
//import { AcName, emailid, phoneNum } from './importFields';
/*
import AcName from '@salesforce/schema/Account.Name';
import emailid from '@salesforce/schema/Account.Email__c';
import phoneNum from '@salesforce/schema/Account.Phone';
*/
import testCreateAcc from '@salesforce/apex/testCreateAccInLwcClass.testCreateAcc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestCreateAccInLwc extends LightningElement {

    @track accDetails = {
        //accNm : AcName,     email: emailid    , phone : phoneNum 
        accNm : '',     email: ''    , phone : '' 
    };

    AccNameCH(event){
        this.accDetails[event.target.name] = event.target.value;
    } 
    
    emailCH(event){
        this.accDetails[event.target.name] = event.target.value;
    } 
    
    phoneCH(event){
        this.accDetails[event.target.name] = event.target.value;
    } 
    
    clickH(){ /*
        const acc = {
            aNm : this.accDetails.accNm, 
            em : this.accDetails.email   , 
            ph : this.accDetails.phone,
        };
        testCreateAcc({ acc})
*/
        testCreateAcc({
            aNm : this.accDetails.accNm, em : this.accDetails.email   , ph : this.accDetails.phone
        })
        .then(result => {
            const event = new ShowToastEvent({
                title : 'acc saved', 
                message : 'acc has been saved.',
                variant : 'success'
            });
            this.dispatchEvent(event);
        })
        .catch(error => {
            const event = new ShowToastEvent({
                title : 'Error', 
                message : 'Error occured.',
                variant : 'error'
            });
            this.dispatchEvent(event);
        });

    } 
      
    
}