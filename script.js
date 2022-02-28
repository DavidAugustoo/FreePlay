// animatios

let target = document.querySelectorAll('[data-anime]');

window.addEventListener('scroll', () => {
    let windowTop = window.scrollY + ((window.innerHeight * 3) / 4);

    target.forEach(element => {
        if((windowTop) > element.offsetTop) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
});

// menu mobile

let menuMobileIcon = document.querySelector('.menu-mobile--icon');
let menuMobile = document.querySelector('.menu-mobile');

menuMobileIcon.addEventListener('click', () => {
    if(menuMobile.classList.contains('closed')) {
        menuMobile.classList.remove('closed');
        menuMobile.classList.add('open');
    } else {
        menuMobile.classList.remove('open');
        menuMobile.classList.add('closed');
    }
});

// carousel

let currentSlide = 0;

function goNext() {
        currentSlide++;
        if(currentSlide > 2) {
            currentSlide = 0;
        }

        updateMargin();
}

function goBack() {
    currentSlide--;
    if(currentSlide < 2) {
        currentSlide = 0;
    }
    
    updateMargin();
}

function updateMargin() {
    let slideritemWidth = document.querySelector('.carousel--item').clientWidth;
    let newMargin = (currentSlide * slideritemWidth);
    document.querySelector('.carousel--item').style.marginLeft = `-${newMargin}px`
}
