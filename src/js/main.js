/* SHOW MENU */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* MENU SHOW */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* MENU HIDDEN */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* CHANGE BACKGROUND HEADER */
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link')
        }
    })
}
// window.addEventListener('scroll', scrollActive) // Disabled for now as it needs precise selector

/* SCROLL REVEAL ANIMATION (Simple CSS-based) */
const sr = {
    reveal: function(selector, options) {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = options.origin === 'top' ? 'translateY(-50px)' : 'translateY(50px)';
            el.style.transition = `all ${options.duration / 1000}s ease-out ${options.delay / 1000}s`;
            observer.observe(el);
        });
    }
};

// Apply simple reveal
window.addEventListener('load', () => {
    sr.reveal('.section__title', { origin: 'top', duration: 1000, delay: 200 });
    sr.reveal('.sobre__content', { origin: 'left', duration: 1000, delay: 400 });
    sr.reveal('.sobre__info-box', { origin: 'right', duration: 1000, delay: 600 });
    sr.reveal('.service-card', { origin: 'bottom', duration: 1000, delay: 200 });
    sr.reveal('.testimonial-card', { origin: 'bottom', duration: 1000, delay: 400 });
    sr.reveal('.contato__info', { origin: 'left', duration: 1000, delay: 200 });
    sr.reveal('.contato__form', { origin: 'right', duration: 1000, delay: 400 });
});

/* FORM SUBMISSION MOCK */
const contactForm = document.querySelector('.contato__form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Enviando...';
        button.disabled = true;

        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}
