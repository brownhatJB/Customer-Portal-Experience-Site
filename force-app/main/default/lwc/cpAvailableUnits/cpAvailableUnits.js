/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement, wire } from 'lwc';
import getAvailableUnits from '@salesforce/apex/UnitsTableController.getAvailableUnits';

export default class CpAvailableUnits extends LightningElement {
    units = [];
    selectedType = 'All';

    @wire(getAvailableUnits, {unitType: '$selectedType'})
    wiredUnits({data, error}) {
        if(data) {
            this.units = data;
        } 
        if(error) {
            console.error(error);
        }
    }

    handleFilterClick(event) {
        const newType = event.target.dataset.type;
        
        if(newType === this.selectedType){
            return;
        }

        this.selectedType = newType;

        console.log(this.selectedType)
    }

    get allClass() {
        return this.selectedType === 'All' ? 'filter active' : 'filter';
    }

    get apartmentClass() {
        return this.selectedType === 'Apartment' ? 'filter active' : 'filter';
    }
    
    get officeClass() {
        return this.selectedType === 'Office' ? 'filter active' : 'filter';
    }
}