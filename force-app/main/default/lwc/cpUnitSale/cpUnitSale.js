/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement, wire } from 'lwc';
import getUnitSales from '@salesforce/apex/GetMyUnitSales.getUnitSales';

export default class CpUnitSale extends LightningElement {
    sales = [];
    activeTabs = {};

    @wire(getUnitSales)
    wiredSales({ data, error }) {
        if (data) {
            // Initialize activeTabs
            const tabs = {};
            data.forEach(sale => {
                tabs[sale.unitSale.Id] = 'details';
            });
            this.activeTabs = tabs;
            
            // Transform data to include computed properties
            this.sales = data.map(sale => {
                return {
                    ...sale,
                    showDetails: true,
                    showPayments: false,
                    showInvoices: false,
                    showReceipts: false,
                    activeDetailsTab: 'tab active',
                    activePaymentsTab: 'tab',
                    activeInvoicesTab: 'tab',
                    activeReceiptsTab: 'tab'
                };
            });
        }
        if (error) {
            console.error(error);
        }
    }

    switchTab(event) {
        const saleId = event.currentTarget.dataset.id;
        const tab = event.currentTarget.dataset.tab;

        // Update activeTabs state
        this.activeTabs = {
            ...this.activeTabs,
            [saleId]: tab
        };

        // Update sales array with new computed values
        this.sales = this.sales.map(sale => {
            if (sale.unitSale.Id === saleId) {
                const isDetails = tab === 'details';
                const isPayments = tab === 'payments';
                const isInvoices = tab === 'invoices';
                const isReceipts = tab === 'receipts';
                return {
                    ...sale,
                    showDetails: isDetails,
                    showPayments: isPayments,
                    showInvoices: isInvoices,
                    showReceipts: isReceipts,
                    activeDetailsTab: isDetails ? 'tab active' : 'tab',
                    activePaymentsTab: isPayments ? 'tab active' : 'tab',
                    activeInvoicesTab: isInvoices ? 'tab active' : 'tab',
                    activeReceiptsTab: isReceipts ? 'tab active' : 'tab'
                };
            }
            return sale;
        });
    }
}
