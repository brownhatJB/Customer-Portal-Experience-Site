/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement, wire } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';

const USER_FIELDS = ['User.ContactId'];
const CONTACT_FIELDS = ['Contact.FirstName', 'Contact.LastName'];

export default class CpProfile extends LightningElement {
    userId = USER_ID;
    contactId;
    contactName;
    isLoaded = false;
    isEditMode = false;

    @wire(getRecord, { recordId: '$userId', fields: USER_FIELDS })
    wiredUser({ data }) {
        if (data) {
            this.contactId = data.fields.ContactId.value;
            this.isLoaded = true;
        }
    }

    @wire(getRecord, { recordId: '$contactId', fields: CONTACT_FIELDS })
    wiredContact({ data }) {
        if(data){
            const first = data.fields.FirstName?.value || '';
            const last = data.fields.LastName?.value || '';
            this.contactName = `${first} ${last}`.trim();
        }
    }

    enableEdit() {
        this.isEditMode = true;
    }

    cancelEdit() {
        this.isEditMode = false;
    }

    handleSuccess() {
        this.isEditMode = false;
    }

    handleError(event) {
        console.error("update failed", event.detail);
    }
}
