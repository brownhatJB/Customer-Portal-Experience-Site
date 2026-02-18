/*******************************************************
 * File: cpUnitSale.cls
 * Author: JOUHAR C (jouhar@metadacorp.com)
 * Date: 13-02-2026
 * Description: 
 * Last Modified By: JOUHAR C
 * Last Modified Date: 
 *******************************************************/

import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import GSAP_ZIP from '@salesforce/resourceUrl/gsap_lib'; 
import MD_HERO_IMG from '@salesforce/resourceUrl/MDRealtyHero';

export default class MdHeroSection extends LightningElement {
    heroImageUrl = MD_HERO_IMG;
    isGsapInitialized = false;

    renderedCallback() {
        if (this.isGsapInitialized) return;
        this.isGsapInitialized = true;

        // Load GSAP and ScrollTrigger sequentially or via Promise.all
        Promise.all([
            loadScript(this, GSAP_ZIP + '/gsap.min.js'),
            loadScript(this, GSAP_ZIP + '/ScrollTrigger.min.js'),
            loadScript(this, GSAP_ZIP + '/SplitText.min.js')
        ])
        .then(() => {
            this.initAnimations();
        })
        .catch(error => {
            console.error('Error loading GSAP', error);
        });
    }

    initAnimations() {
        // Register the plugin (important!)
        gsap.registerPlugin(ScrollTrigger, SplitText);

        const title = this.template.querySelector('.main-title');
        const tagline = this.template.querySelector('.tagline-flex');
        const cta = this.template.querySelector('.cta-box');
        const bg = this.template.querySelector('.background-img');

        this.splitTitle = new SplitText(title, {
            type: "chars",
            charsClass: "split-char"
        });

        // 1. ENTRANCE TIMELINE
        const tl = gsap.timeline();
        tl.from(this.splitTitle.chars, {
            y: 60,
            rotationX: 160,
            rotationY: gsap.utils.random(-20, 20),
            rotaionZ: gsap.utils.random(-10, 10),
            opacity: 0,
            duration: 1.3,
            ease: "power4.out",
            stagger: {
                each: 0.03,
                from: "left"
            }
        })
        .from(tagline, {
            x: -50,
            opacity: 0,
            duration: 0.8
        }, "-=0.6") // Starts 0.6s early
        .from(cta, {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.4");

        // 2. PARALLAX BACKGROUND
        gsap.to(bg, {
            yPercent: 20, // Moves the image down slightly as you scroll
            ease: "none",
            scrollTrigger: {
                trigger: this.template.querySelector('.hero-container'),
                start: "top top",
                end: "bottom top",
                scrub: true // Ties the animation to the scrollbar
            }
        });
    }

}