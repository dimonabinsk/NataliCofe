import WOW from 'wow.js';
import $ from 'jquery';
import 'slick-carousel';
import {createFocusTrap} from 'focus-trap';

let wow = new WOW({
    boxClass: "animation",      
    animateClass: 'animate__animated',
    offset: 100,
    mobile: true,
    live: true
});
wow.init();

let preloader = document.querySelector('.preloader');
preloader.addEventListener('animationend', function(e){
    if( e.target === preloader ) {
        document.body.classList.remove('ov-h');
    }  
});

$('.article-slider__container').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '.article-slider__btn_prev',
    nextArrow: '.article-slider__btn_next'
});



let mobileBtn = document.querySelector('.btn-mobile');
let headerNav = document.querySelector('.main-header__nav');
function mobileMenuOpen() {
    mobileBtn.classList.add('is-open');
    mobileBtn.classList.add("animate__animated");
    headerNav.classList.add('is-open');
    headerNav.classList.add("animate__animated");
    document.body.classList.add('ov-h');    
}

function mobileMenuClose() {
    document.body.classList.remove('ov-h');
    mobileBtn.classList.remove("animate__animated");
    headerNav.classList.remove('is-open');
    document.body.classList.remove('ov-h'); 
    headerNav.classList.remove("animate__animated");
}

mobileBtn.addEventListener('click', function(e){
    if( mobileBtn.classList.contains('is-open')){
        mobileMenuClose();
    } else {
        mobileMenuOpen();
    }
});

headerNav.addEventListener('click', e => {
    if( headerNav.classList.contains('is-open') ) {
        mobileMenuClose();
    }
});

let modalBtns = document.querySelectorAll('.btn-modal');
let modalOverlay = document.querySelector('.modal-overlay');
let modalModals = document.querySelectorAll('.modal');
let modalCloser = document.querySelector('.modal-overlay__close');
let modalTrap = createFocusTrap(modalOverlay, {
    initialFocus:'.modal.active'
});

function modalOpen(e) {
    e.preventDefault();
    let anchor = e.target.getAttribute('data-href');
    let goal = document.querySelector(anchor);

    modalOverlay.classList.add('active');
    modalOverlay.classList.add('animate__animated');
    goal.classList.add('active');
    goal.classList.add('animate__animated');
    goal.setAttribute('tabindex', 0);
    document.body.classList.add('ov-h');
    modalTrap.activate();
}

function modalClose() {
    let actives = document.querySelectorAll(
        '.modal-overlay.active, .modal.active'
    );
    actives.forEach((active) => {
        active.classList.remove('active');
        active.classList.remove('animate__animated');
        active.removeAttribute('tabindex',0);
    });
    modalTrap.deactivate();
    document.body.classList.remove('ov-h');
}

modalBtns.forEach( modalBtn => {
    modalBtn.addEventListener('click', modalOpen);
});

modalCloser.addEventListener('click', modalClose);

modalModals.forEach( (modal) => {
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

modalOverlay.addEventListener('click', modalClose);

window.addEventListener('keydown', (e) => {
    if( e.key === 'Escape'){
        modalClose();
        mobileMenuClose();
    }
});

let tabLinks = document.querySelectorAll('.tabs__link');
function tabsToggle(e){
    e.preventDefault();
    let anchor = e.target.getAttribute('href');
    let goal = document.querySelector(anchor);

    let actives = document.querySelectorAll(
        '.tabs__item.active, .tabs-content__section.active');
    actives.forEach( (active) => {
        active.classList.remove('active');
        active.classList.remove('animate__animated');
    });
    e.target.parentElement.classList.add('active');
    goal.classList.add('active');
    goal.classList.add('animate__animated');
}

tabLinks.forEach( (tabLink) => {
    tabLink.addEventListener('click', tabsToggle);
});

let header = document.querySelector('.main-header');
function stickyHeader() {
    // console.log(1);
    if(window.scrollY > 500){
        header.classList.add('scrolled');
    } else{
        header.classList.remove('scrolled');
    }
}

function throttle( func, time) {
    let isThrottled = false;
    return function(){
        if( isThrottled ) 
            return;
            let ctx = this;
            let args = arguments;        
            func.apply(ctx, args);
            isThrottled = true;
        setTimeout(()=>{
            isThrottled = false;
         }, time);
    };
}

window.addEventListener('scroll', throttle(stickyHeader, 300));