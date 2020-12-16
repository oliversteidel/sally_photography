$(document).ready(function () {

    const rotateLink = (id) => {
        $('.nav__link--' + id).removeClass('link-up');
        $('.nav__link--' + id).siblings().addClass('bottom-down');
    }

    const backToDefault = (id) => {
        $('.nav__link--' + id).addClass('link-up');
        $('.nav__link--' + id).siblings().removeClass('bottom-down');
    }

    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.4
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                rotateLink(entry.target.classList[0]);
            } else {
                backToDefault(entry.target.classList[0]);
            }
        })
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    })





});
