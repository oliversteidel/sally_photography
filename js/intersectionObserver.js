$(document).ready(function () {

    const rotateLink = (id) => {        
        $('.nav__link--' + id).removeClass('link-up');
        $('.nav__link--' + id).siblings().addClass('bottom-down');
    }

    const backToDefault = (id) => {        
        $('.nav__link--' + id).addClass('link-up');
        $('.nav__link--' + id).siblings().removeClass('bottom-down');
    }

    

    const threshold = 0.4;

    document.querySelectorAll('section').forEach(el => {
        let elHeight = el.getBoundingClientRect().height;        
        let th = threshold;

        // if element is too tall to ever hit the threshold - change threshold

        if (elHeight > (window.innerHeight * threshold)) {
            th = ((window.innerHeight * threshold) / elHeight) * threshold;
        }

        new IntersectionObserver(iEls => iEls.forEach(iEl => {
            if (iEl.isIntersecting) {                                  
                rotateLink(iEl.target.classList[0]);
            }else {                
                backToDefault(iEl.target.classList[0]);
            }
        }), {threshold: th}).observe(el);
    })

    
});
