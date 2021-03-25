$(document).ready(function () {

    //nav visibility animation on mobile
    var navOpen = false;

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

    // $('.nav__link-wrapper').mouseout(function() {
    //     turn = true;
    // })

    //animation of nav__links
    $('.nav__link-wrapper').hover(function () {
        $(this).children(':first').toggleClass('link-up');
        $(this).children(':last').toggleClass('bottom-down');
    });

    //slideranimation
    var turnCounter = 1;
    var removeCounter = 1;
    var addCounter = 2;

    const runSlider = () => {
        removeCounter = turnCounter;
        if (turnCounter < 5) {
            addCounter = turnCounter + 1;
        } else {
            addCounter = 1;
        }

        for (var i = 1; i <= 5; i++) {
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

    const nextImg = (num, animation) => {
        //gsap.to(".currentImg", { duration: 0.75, ease: "expo.out", x: -100, opacity: 0 });
        imgWrapper.empty();
        var img = galleryImgArr[num];
        setImg(img, getImgRatio(img), animation);
    }

    const openModal = () => {
        modal.removeClass('closed');
        modal.css('opacity', '1');
        modalOpen = true;
    }

    const closeModal = () => {
        modal.addClass('closed');
        modalOpen = false;
    }

    //every image has "acr" or "up" for across/upright set in filename
    const getImgRatio = (attr) => {
        var imgRatio = attr;
        let isAcross = /acr/;
        return isAcross.test(imgRatio);
    }

    const setImg = (src, ratioAcr, animation) => {
        if (ratioAcr) {
            imgWrapper.append(`<img src="${src}" class="acr ${animation}">`);
        } else {
            imgWrapper.append(`<img src="${src}" class="up ${animation}">`);
        }
    }

    //hide evrything underneath modal

    const hideSide = (bool) => {
        const logoContainer = $('.logo-container');
        const contactHead = $('.contact-head');
        const burgerMenu = $('.burger-menu');
        const container = $('.container');

        const content = [logoContainer, contactHead, burgerMenu, container];
        if (bool) {
            content.forEach(item => {
                item.css('visibility', 'hidden');
            });
        } else {
            content.forEach(item => {
                item.css('visibility', 'visible');
            });
        }
    }

    $('.gallery__img').click(function () {
        if ($(this).attr("class").length == 26) {
            imgPos = $(this).attr("class").substr(-1);
        } else {
            imgPos = $(this).attr("class").substr(-2);
        }

        var img = $(this).attr("src");
        setImg(img, getImgRatio(img), "nextImg");
        openModal();
        hideSide(true);
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
        hideSide(false);
        imgWrapper.empty();
    });

    // swipe gallery images on mobile    

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

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
        // if swip up & down is needed
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

    // scroll to section animation

    $('.nav__link-wrapper').click(function (event) {
        event.preventDefault();
        let target = $(this).children().first().attr('href');
        $('html,body').animate({
            scrollTop: $(target).offset().top - 100
        }, 500);
    });

});


