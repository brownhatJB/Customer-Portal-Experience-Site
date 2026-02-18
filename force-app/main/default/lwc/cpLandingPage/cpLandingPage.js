import { LightningElement } from 'lwc';
import isGuest from '@salesforce/user/isGuest'

export default class CpLandingPage extends LightningElement {
    isGuestUser = isGuest;
}