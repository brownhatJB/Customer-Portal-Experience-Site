import { LightningElement, wire } from 'lwc';
import getMyOffers from '@salesforce/apex/GetMyOffers.getMyOffers'

export default class CpPastOffers extends LightningElement {
    offers = [];

    @wire(getMyOffers)
    wiredOffers({data, error}) {
        if(data) {
            this.offers = data;
        }
        if(error) {
            console.error(error);
        }
    }
}