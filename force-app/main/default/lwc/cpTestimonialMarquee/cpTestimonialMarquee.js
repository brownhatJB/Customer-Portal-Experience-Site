import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import GSAP from '@salesforce/resourceUrl/gsap_lib';


export default class CpTestimonialMarquee extends LightningElement {
    testimonials = [
        {
            id: 1,
            dupId: '1-dup',
            name: 'Nadim Kobeissi',
            text: 'Fugiat laborum voluptate labore do culpa culpa officia. Ipsum pariatur aliquip officia anim sint enim ipsum pariatur incididunt Lorem tempor Lorem esse sint. Laboris ex ea deserunt nulla nulla. Aliquip sint eiusmod ut Lorem laboris ut. Do commodo id elit qui.',
            rating: 5
        },
        {
            id: 2,
            dupId: '2-dup',
            name: 'Tovino Dsouza',
            text: 'Fugiat laborum voluptate labore do culpa culpa officia. Ipsum pariatur aliquip officia anim sint enim ipsum pariatur incididunt Lorem tempor Lorem esse sint. Laboris ex ea deserunt nulla nulla. Aliquip sint eiusmod ut Lorem laboris ut. Do commodo id elit qui.',
            rating: 5
        },
        {
            id: 3,
            dupId: '3-dup',
            name: 'Riya Jan',
            text: 'Fugiat laborum voluptate labore do culpa culpa officia. Ipsum pariatur aliquip officia anim sint enim ipsum pariatur incididunt Lorem tempor Lorem esse sint. Laboris ex ea deserunt nulla nulla. Aliquip sint eiusmod ut Lorem laboris ut. Do commodo id elit qui.',
            rating: 5
        },
        {
            id: 4,
            dupId: '4-dup',
            name: 'Sam Wright',
            text: 'Fugiat laborum voluptate labore do culpa culpa officia. Ipsum pariatur aliquip officia anim sint enim ipsum pariatur incididunt Lorem tempor Lorem esse sint. Laboris ex ea deserunt nulla nulla. Aliquip sint eiusmod ut Lorem laboris ut. Do commodo id elit qui.',
            rating: 5
        },
        {
            id: 5,
            dupId: '5-dup',
            name: 'Julie Sweet',
            text: 'Fugiat laborum voluptate labore do culpa culpa officia. Ipsum pariatur aliquip officia anim sint enim ipsum pariatur incididunt Lorem tempor Lorem esse sint. Laboris ex ea deserunt nulla nulla. Aliquip sint eiusmod ut Lorem laboris ut. Do commodo id elit qui.',
            rating: 5
        }
    ];

    marqueeTween;
    initialized = false;

    renderedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        loadScript(this, GSAP + '/gsap.min.js').then(() => {
            this.initMarquee();
        });
    }

    initMarquee() {
        const track = this.template.querySelector('.marquee-track');

        this.marqueeTween = window.gsap.to(track, {
            xPercent: -50,       // moves LEFT
            duration: 30,        // slow = premium
            ease: 'none',
            repeat: -1
        });
    }

    pauseMarquee() {
        this.marqueeTween.pause();
    }

    resumeMarquee() {
        this.marqueeTween.play();
    }

    handleCardEnter(event) {
    window.gsap.to(event.currentTarget, {
        rotate: -2,
        y: -10,
        scale: 1.03,
        duration: 0.35,
        ease: 'power3.out'
    });
}

    handleCardLeave(event) {
        window.gsap.to(event.currentTarget, {
            rotate: 0,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power3.out'
        });
    }
    
    handleCardClick() {
        this.marqueeTween.paused(!this.marqueeTween.paused());
    }

}
