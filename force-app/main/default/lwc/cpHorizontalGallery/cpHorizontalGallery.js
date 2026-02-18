/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadatacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import GSAP_ZIP from '@salesforce/resourceUrl/gsap_lib';
import H_GALLERY_1 from '@salesforce/resourceUrl/hGallery1';
import H_GALLERY_2 from '@salesforce/resourceUrl/hGallery2';
import H_GALLERY_3 from '@salesforce/resourceUrl/hGallery3';
import H_GALLERY_4 from '@salesforce/resourceUrl/hGallery4';
import H_GALLERY_5 from '@salesforce/resourceUrl/hGallery5';

export default class cpHorizontalGallery extends LightningElement {
    isGsapInitialized = false;

    images = [
        { id: 1, url: H_GALLERY_1 },
        { id: 2, url: H_GALLERY_2 },
        { id: 3, url: H_GALLERY_3 },
        { id: 4, url: H_GALLERY_4 },
        { id: 5, url: H_GALLERY_5 },
    ];

    renderedCallback() {
        if (this.isGsapInitialized) return;
        this.isGsapInitialized = true;

        Promise.all([
            loadScript(this, GSAP_ZIP + '/gsap.min.js'),
            loadScript(this, GSAP_ZIP + '/ScrollTrigger.min.js')
        ]).then(() => {
            this.initScroll();
        });
    }

    initScroll() {
        gsap.registerPlugin(ScrollTrigger);

        const track = this.template.querySelector('.horizontal-track');
        const section = this.template.querySelector('.horizontal-section');

        const scrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollWidth}`,
                pin: true,
                scrub: 1
            }
        });
    }
}
