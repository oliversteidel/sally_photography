$(document).ready(function () {

    //nav visibility animation on mobile
    let navOpen = false;

    //transform Burger Icon to cross
    const burgerOpen = () => {
        $('.burger-menu__line--middle').css('opacity', '0');
        $('.burger-menu__line--top').css('transform', 'translateY(10px) rotate(45deg)');
        $('.burger-menu__line--bottom').css('transform', 'translateY(-10px) rotate(-45deg');
    }

    //tranform Burger Icon to default
    const burgerClose = () => {
        $('.burger-menu__line--middle').css('opacity', '1');
        $('.burger-menu__line--top').css('transform', 'rotate(0)');
        $('.burger-menu__line--bottom').css('transform', 'rotate(0');
    }

    $('.burger-menu').click(() => {
        if (!navOpen) {
            burgerOpen();
            gsap.to(".nav-container", { duration: 1, ease: "expo.out", x: 0 });
            navOpen = true;
        } else {
            gsap.to(".nav-container", { duration: 0.75, ease: "expo.in", x: '-100%' });
            burgerClose();
            navOpen = false;
        }
    });

    //close nav when link is clicked
    $('.nav__link-wrapper').click(() => {
        if (navOpen) {
            gsap.to(".nav-container", { duration: 0.75, ease: "expo.out", x: '-100%' });
            burgerClose();
            navOpen = false;
        }
    })

    //animation of nav__links
    $('.nav__link-wrapper').hover(function (e) {        
        $(this).children(':first').toggleClass('link-up');
        $(this).children(':last').toggleClass('bottom-down');
    });

    //ISSUE: weird behaviour while navigating through page; sometimes highlighted sometimes not;
    //
    // $('.nav__link-wrapper').click(function () {
    //     $(this).children(':first').toggleClass('link-up');
    //     $(this).children(':last').toggleClass('bottom-down');
    // });

    //slideranimation
    let turnCounter = 1;
    let removeCounter = 1;
    let addCounter = 2;

    const runSlider = () => {
        removeCounter = turnCounter;
        if (turnCounter < 5) {
            addCounter = turnCounter + 1;
        } else {
            addCounter = 1;
        }

        for (let i = 1; i <= 5; i++) {
            $(".img" + i).removeClass("pos" + removeCounter);
            $(".img" + i).addClass("pos" + addCounter);

            if (removeCounter < 5) {
                removeCounter++;
            } else {
                removeCounter = 1;
            }
            if (addCounter < 5) {
                addCounter++;
            } else {
                addCounter = 1;
            }
        }
    }

    setInterval(() => {
        runSlider();
        if (turnCounter < 5) {
            turnCounter++;
        } else {
            turnCounter = 1;
        }
    }, 4000);

    // show selected gallery-image in modal
    const galleryImgArr = [];
    let imgPos;
    let buttonsDisabled = false;
    let modalOpen = false;


    const modal = $('.modal'),
        modalCloseBtn = $('.modal__btn--close'),
        imgWrapper = $('.modal__img-wrapper');

    //fill galleryImgArr with src-attr of each image in gallery    
    for (let i = 0; i <= $('.gallery__img').length - 1; i++) {
        galleryImgArr.push($('.gallery__img' + i).attr("src"));
    }
    
    const openModal = () => {
        modal.removeClass('closed');
        gsap.to(modal, {duration: 0.5, ease:"circ.in", opacity: 1, onComplete: function() {
            modalOpen = true;
        }});        
    }

    const closeModal = () => {
        gsap.to(modal, {duration: 0.5, ease:"circ.out", opacity: 0, onComplete: function() {
            modal.addClass('closed');
            modalOpen = false;
        }});       
    }

    const nextImg = (num, animation) => {        
        imgWrapper.empty();
        let img = galleryImgArr[num];
        setImg(img, getImgRatio(img), animation);
    }

    const setImg = (src, ratioAcr, animation) => {
        if (ratioAcr) {
            imgWrapper.append(`<img src="${src}" class="acr ${animation}">`);
        } else {
            imgWrapper.append(`<img src="${src}" class="up ${animation}">`);
        }
    }

    //every image has "acr" or "up" for across/upright set in filename
    //returns true if img-ratio is across
    const getImgRatio = (attr) => {
        let imgRatio = attr;
        let isAcross = /acr/;
        return isAcross.test(imgRatio);
    }

    const getImgPosition = (el) => {
        if ($(el).attr("class").length == 26) {
            imgPos = $(el).attr("class").substr(-1);
        } else {
            imgPos = $(el).attr("class").substr(-2);
        }
    }    

    //hide everything underneath modal
    const hideSite = (bool) => {
        const logoContainer = $('.logo-container');
        const contactHead = $('.contact-head');
        const burgerMenu = $('.burger-menu');
        const container = $('.container');

        const content = [logoContainer, contactHead, burgerMenu, container];
        if (bool) {
            content.forEach(item => {
                gsap.to(item, {duration: 0.5, ease: "circ.out", opacity: 0});
            });            
        } else {
            content.forEach(item => {
                gsap.to(item, {duration: 0.5, ease: "circ.in", opacity: 1});
            });           
        }
    }

    $('.gallery__img').click(function () {
        getImgPosition(this);
        let img = $(this).attr("src");
        setImg(img, getImgRatio(img), "nextImg");
        openModal();
        hideSite(true);
    });

    $('.gallery__img').keyup(function(e) {
        let code = e.key;
        if(code === "Enter") {
            getImgPosition(this);
            let img = $(this).attr("src");
            setImg(img, getImgRatio(img), "nextImg");
            openModal();
            hideSite(true);
        }
    });

    $('.modal__btn--next').click(function () {
        if (imgPos < galleryImgArr.length - 1) {
            imgPos++;
            nextImg(imgPos, "nextImg");
        }
    });

    $('.modal__btn--prev').click(function () {
        if (imgPos >= 1) {
            imgPos--;
            nextImg(imgPos, "prevImg");
        }
    });

    // hide modal buttons on click
    $('.modal__img-wrapper').click(() => {
        if (!buttonsDisabled) {
            modalCloseBtn.css('visibility', 'hidden');
            $('.modal__btn--next').css('visibility', 'hidden');
            $('.modal__btn--prev').css('visibility', 'hidden');
            buttonsDisabled = true;
        } else {
            modalCloseBtn.css('visibility', 'visible');
            $('.modal__btn--next').css('visibility', 'visible');
            $('.modal__btn--prev').css('visibility', 'visible');
            buttonsDisabled = false;
        }
    });

    modalCloseBtn.click(() => {
        closeModal();
        hideSite(false);
        imgWrapper.empty();
    });

    // swipe gallery images on mobile    

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0 && modalOpen) {
                /* left swipe */
                if (imgPos < galleryImgArr.length - 1) {
                    imgPos++;
                    nextImg(imgPos, "nextImg");
                }
            } else {
                /* right swipe */
                if (imgPos >= 1) {
                    imgPos--;
                    nextImg(imgPos, "prevImg");
                }
            }
        }
        // if swipe up & down is needed
        // } else {
        //     if (yDiff > 0 && modalOpen) {
        //         /* up swipe */
        //     } else {
        //         /* down swipe */
        //     }
        // }
        /* reset values */
        xDown = null;
        yDown = null;
    };    
});


