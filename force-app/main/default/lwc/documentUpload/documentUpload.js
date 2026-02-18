/**
 * @module            : Real_Estate_Module
 * @description       : LWC component used to add document upload and document preview functionality to data table
 * @namespace         :
 * @author            : SREERAM.R
 * @group             : Document Checklist
 * @last modified on  : 06-21-2024
 * @last modified by  : SREERAM.R
 **/
import { LightningElement, api , wire } from 'lwc';

//Salesforce functions
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import {NavigationMixin} from 'lightning/navigation'
import {loadStyle} from 'lightning/platformResourceLoader'; 
import Toast from 'lightning/toast';

//Import static resorces
import fileSelectorStyles from '@salesforce/resourceUrl/fileSelectorStyles';

//Salesforce object schema api names
import ID_FIELD from '@salesforce/schema/Document__c.Id';
import DOCUMENT_UPLOADED_FIELD from "@salesforce/schema/Document__c.Status__c";
import DOCUMENT_CHECKLIST_FIELD from "@salesforce/schema/Document__c.Document_Uploaded__c";
import CONTENT_ID_FIELD from "@salesforce/schema/Document__c.contentDocumentId__c";
import INVENTORY_IMPORT_ID from "@salesforce/schema/Inventory_Import__c.Id";
import INVENTORY_IMPORT_DOCUMENT_UPLOADED from "@salesforce/schema/Inventory_Import__c.Document_uploaded__c";
import INVENTORY_IMPORT_CONTENT_DOCUMENT_ID from "@salesforce/schema/Inventory_Import__c.contentDocumentId__c";

//Importing Apex Method
import getUserType from '@salesforce/apex/UserUtil.getUserType';

//Table columns
const fields = [CONTENT_ID_FIELD];

export default class FileUpload extends NavigationMixin(LightningElement) {

    //Variables
    @api recordId;
    @api acceptedFileFormats;
    @api fileUploaded;
    @api wiredContactDocs;
    importId;
    userType

    //callback
    renderedCallback() {
        Promise.all([
            loadStyle(this, fileSelectorStyles)
        ]);        
    }

    //Wires
    @wire(getRecord, { recordId: '$recordId', fields: ['Document__c.Inventory_Import__c'] })
    wiredRecord({ error, data }) {
        if (data) {
            this.importId = data.fields.Inventory_Import__c.value;
        } else if (error) {
            console.error('Error loading record', error);
        }
    }

    @wire(getRecord, { recordId: "$recordId", fields })
    account;

    @wire(getUserType)
    wiredUserType({ data, error}) {
        if(data) {
            this.userType = data;
        }
        if(error) {
            console.error(error);
        }
    }

    //Events
    previewHandler() {
        const contentDocumentId = this.revenue;
        
        if(!contentDocumentId) {
            // this.dispatchEvent(new ShowToastEvent({
            //     title: 'Upload Document First',
            //     message: 'File has not been uploaded',
            //     variant: 'error',
            // }));
            Toast.show({
                label: 'Upload Document First',
                message: 'File has not been uploaded',
                variant: 'error',
                mode: 'dismissible'
            }, this);
            return;
        } 
        
        const fileUrl = `/sfc/servlet.shepherd/document/download/${contentDocumentId}`;

        if(this.userType === 'Standard') {
            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'filePreview'
                },
                state: {
                    selectedRecordId: contentDocumentId
                }
            });
        } else {
            window.open(fileUrl, '_blank')
        }
        
    }

    handleUploadFinished(event) {
        const contentDocumentId = event.detail.files[0].documentId;
        // this.dispatchEvent(new ShowToastEvent({
        //     title: 'Completed',
        //     message: 'File has been uploaded',
        //     variant: 'success',
        // }));
        Toast.show({
            label: 'Completed',
            message: 'File has been uploaded',
            variant: 'Success',
            mode: 'dismissible'
        }, this);
        
        this.updateRecord(contentDocumentId);
        if(this.importId) {
            this.updateInventoryRecord(contentDocumentId);
        }  
    }

    //Helper methods
    updateInventoryRecord(contentDocumentId) {        
        const fields = {};
        fields[INVENTORY_IMPORT_ID.fieldApiName] = this.importId;
        fields[INVENTORY_IMPORT_DOCUMENT_UPLOADED.fieldApiName] = true;
        fields[INVENTORY_IMPORT_CONTENT_DOCUMENT_ID.fieldApiName] = contentDocumentId;
        const recordInput = { fields };
        updateRecord(recordInput)
            .then(() => {                
            })
    }

    updateRecord(contentDocumentId) {
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[DOCUMENT_UPLOADED_FIELD.fieldApiName] = 'Document Uploaded';
        fields[DOCUMENT_CHECKLIST_FIELD.fieldApiName] = true;
        fields[CONTENT_ID_FIELD.fieldApiName] = contentDocumentId;
        const recordInput = { fields };
        const event = CustomEvent('refresh', {
            composed: true,
            bubbles: true
        });
        updateRecord(recordInput)
            .then(() => {                
                this.dispatchEvent(event);
            })
    }

    //getter method
    get revenue() {
        return getFieldValue(this.account.data, CONTENT_ID_FIELD);
    }

}