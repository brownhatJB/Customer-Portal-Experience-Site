import { LightningElement, wire } from 'lwc';
import getMyEnquiries from '@salesforce/apex/GetMyEnquiries.getMyEnquiries';

export default class CpPastEnquiries extends LightningElement {
    enquiries = [];

    @wire(getMyEnquiries)
    wiredLeads({ data, error}) {
        if(data) {
            this.enquiries = data;
        }
        if(error) {
            console.error(error);
        }
    }

}