/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement, wire, api } from 'lwc';
import USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi'
import CONTACT_ID_FIELD from '@salesforce/schema/User.ContactId';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Contact.AccountId';

export default class CpAccountPage extends LightningElement {
    accountId;
    contactId;

    @wire(getRecord, {recordId: USER_ID, fields: [CONTACT_ID_FIELD]})
    wiredUser({data, error}) {
        if(data) {
            this.contactId = data.fields.ContactId.value;
        }
        if(error) {
            console.error(error);
        }
    }

    @wire(getRecord, {recordId: '$contactId', fields: [ACCOUNT_ID_FIELD]})
    wiredContact({data, error}) {
        if(data) {
            this.accountId = data.fields.AccountId.value;
        }
        if(error) {
            console.error(error);
        }
    }
}