/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement } from 'lwc';
import createLead from '@salesforce/apex/CpCTALeadController.createLead';

export default class CpCTA extends LightningElement {

    isSubmitted = false;

    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    company = '';
    description = '';

    handleChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    async handleSubmit() {
        try {
            await createLead({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                company: this.company,
                description: this.description
            });

            this.isSubmitted = true;

            requestAnimationFrame(() => {
                const success = this.template.querySelector('.success-state');

                if (success && window.gsap) {
                    window.gsap.from(success, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                }
            });

        } catch (error) {
            console.error('Error creating lead', error);
        }
    }
}
