import { LightningElement } from 'lwc';
import isGuest from '@salesforce/user/isGuest'
import { loadScript } from 'lightning/platformResourceLoader';
import GSAP from '@salesforce/resourceUrl/gsap_lib';

export default class CpLandingPage extends LightningElement {
    isGuestUser = isGuest;

    isLoaded = false;

    renderedCallback() {
        if(this.isLoaded) return;

        this.isLoaded = true;

        loadScript(this, GSAP + '/gsap.min.js')
        .then(() => {
            this.initIntro();
        })
    }

    initIntro() {
        const intro = this.template.querySelector('.page-intro');
        const wrapper = this.template.querySelector('.landing-wrapper');
        const hero = this.template.querySelector('c-hero-section');

        const tl = gsap.timeline({
            defaults: { ease: "power4.inOut" }
        });

        tl.to({}, { duration: 1.5 }) // pause (like delay)
        
        .to(intro, {
            duration: 1.2,
            y: "-100%"   // SLIDE UP
        })

        .to(wrapper, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.6")

        .set(intro, { display: "none" })

        .add(() => {
            hero.startHeroAnimations();
        })

    }
}