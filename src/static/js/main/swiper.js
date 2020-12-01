var swiper = new Swiper('.swiper-container', {
    updateOnWindowResize: true,
    observer: true,
    observeParents: true,   
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        250: {
            slidesPerView: 1,
            spaceBetween: 15
        },
        550: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        850: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        1150: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        1450: {
            slidesPerView: 3,
            spaceBetween: 15
        }
    }
});