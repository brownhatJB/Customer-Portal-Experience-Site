/**
 * @module            : Real_Estate_Module
 * @description       : LWC component used to attach document to document record
 * @namespace         :
 * @author            : SREERAM.R
 * @group             : Document Checklist
 * @last modified on  : 05-24-2024
 * @last modified by  : SREERAM.R
 **/
import { LightningElement, api, wire } from "lwc";

//Salesforce functions
import { updateRecord } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

//Apex class
import documentChecklist from "@salesforce/apex/DocumentRecordCollection.documents";

//Salesforce object schema api names
import ID_FIELD from "@salesforce/schema/Document__c.Id";
import DOCUMENT_ID_FIELD from "@salesforce/schema/Document__c.Name";
import DOCUMENT_NAME_FIELD from "@salesforce/schema/Document__c.Name__c";
import DOCUMENT_STATUS_FIELD from "@salesforce/schema/Document__c.Status__c";
import EXPIRY_DATE_FIELD from "@salesforce/schema/Document__c.Expiry_Date__c";
import DOCUMENT_CHECKLIST_FIELD from "@salesforce/schema/Document__c.Document_Checklist__c";

//Table columns
const colums = [
  {
    label: "ID",
    fieldName: DOCUMENT_ID_FIELD.fieldApiName,
    type: "text",
    initialWidth: 80
  },
  {
    label: "Name",
    fieldName: DOCUMENT_NAME_FIELD.fieldApiName,
    type: "text",
    initialWidth: 100
  },
  {
    label: "Expiry Date",
    fieldName: EXPIRY_DATE_FIELD.fieldApiName,
    editable: "true",
    type: "date-local",
    initialWidth: 120
  },
  {
    label: "Status",
    fieldName: DOCUMENT_STATUS_FIELD.fieldApiName,
    type: "text",
    initialWidth: 200
  },
  {
    label: "Document upload",
    type: "fileUpload",
    fieldName: "Id",
    typeAttributes: { acceptedFileFormats: ".jpg,.jpeg,.pdf,.png,.csv,.txt" }
  }
];

export default class DocumentCheklist extends LightningElement {
  //Variables
  @api recordId;
  col = colums;
  draftValues = [];
  wiredDocs;
  Docs = [];

  //Wires
  //wire documents to be displayed
  @wire(documentChecklist, { recordId: "$recordId" })
  wiredDoc(result) {
    this.wiredDocs = result;
    if (result.data) {
      this.Docs = result.data;
    } else if (result.error) {
      console.error("Error fetching data:", result.error);
    }
  }

  //Events
  //update expiry date of document record
  saveupdate(event) {
    const today = new Date(); // Get today's date
    const invalidDrafts = [];

    const recordInputs = event.detail.draftValues.map((draft) => {
      const expiryDate = new Date(draft.Expiry_Date__c);
      // Check if the expiry date is earlier than today
      if (expiryDate < today) {
        invalidDrafts.push(draft);
        return null; // Skip invalid drafts
      }
      const fields = {};
      fields[ID_FIELD.fieldApiName] = draft.Id;
      fields[EXPIRY_DATE_FIELD.fieldApiName] = draft.Expiry_Date__c;
      fields[DOCUMENT_CHECKLIST_FIELD.fieldApiName] = true;
      return { fields };
    }).filter(recordInput => recordInput !== null); // Remove null entries

      if (invalidDrafts.length > 0) {
      // Show toast event for invalid dates
        this.dispatchEvent(
          new ShowToastEvent({
              title: "Invalid Date",
              message: "Please enter a valid date.",
              variant: "error"
          })
        );
      return; // Exit the function without performing updates
      }
    // Chain the update promises to ensure they execute sequentially
    recordInputs
      .reduce((promiseChain, recordInput) => {
        return promiseChain.then(() => updateRecord(recordInput));
      }, Promise.resolve())
      .then(() => {
        this.draftValues = [];
        return refreshApex(this.wiredDocs);
      })
      .catch((error) => {
        console.error(error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error updating records",
            message: error.body.message,
            variant: "error"
          })
        );
      });
  }

  //refresh the wire used to get document records
  refreshHandler() {
    return refreshApex(this.wiredDocs);
  }
}