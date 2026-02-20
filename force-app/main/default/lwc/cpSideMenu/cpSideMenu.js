import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import GSAP_ZIP from '@salesforce/resourceUrl/gsap_lib';
import isGuest from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';

export default class CpSideMenu extends LightningElement {
    gsap;
    sidebar;
    overlay;
    items;
    gsapLoaded = false;
    isOpen = false;
    isGuestUser = isGuest;

    renderedCallback() {
        if (this.gsapLoaded) return;
        this.gsapLoaded = true;

        loadScript(this, GSAP_ZIP + '/gsap.min.js')
            .then(() => {
                this.gsap = window.gsap; 
                this.initAnimations();
            })
            .catch(error => {
                console.error('GSAP failed to load', error);
            });
    }

    initAnimations() {
        this.sidebar = this.template.querySelector('.sidebar');
        this.overlay = this.template.querySelector('.overlay');
        this.items = this.template.querySelectorAll('.menu-item');

        // Sidebar hidden initially
        this.gsap.set(this.sidebar, { xPercent: -100 });
        this.gsap.set(this.overlay, { opacity: 0, pointerEvents: 'none' });
    }

    openMenu() {
        if (!this.gsap) return;

        this.isOpen = true;

        this.gsap.to(this.overlay, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out'
        });

        this.gsap.to(this.sidebar, {
            xPercent: 0,
            duration: 0.6,
            ease: 'power4.out'
        });

        this.gsap.fromTo(
            this.items,
            { x: -20, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                stagger: 0.08,
                delay: 0.2,
                duration: 0.4,
                ease: 'power3.out'
            }
        );
    }

    closeMenu() {
        if (!this.gsap) return;

        this.isOpen = false;

        this.gsap.to(this.overlay, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in'
        });

        this.gsap.to(this.sidebar, {
            xPercent: -100,
            duration: 0.5,
            ease: 'power4.in'
        });
    }

    toggleMenu() {
        if(this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    get logoutLink() {
        const sitePrefix = basePath.replace("/", "");
        return `/${sitePrefix}/secur/logout.jsp`;

    }

    get accountLink() {
        if(isGuest) {
            return '/login';
        } else {
            return '/account';
        }
    }

    get appointmentLink() {
        if(isGuest) {
            return '/login';
        } else {
            return '/appointments';
        }
    }
}
