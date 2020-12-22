$(document).ready(function () {

    //nav visibility animation on mobile
    var navOpen = false;

    const burgerOpen = () => {
        $('.burger-menu__line--middle').css('opacity', '0');
        $('.burger-menu__line--top').css('transform', 'translateY(10px) rotate(45deg)');
        $('.burger-menu__line--bottom').css('transform', 'translateY(-10px) rotate(-45deg');
        
    }

    const burgerClose = () => {
        $('.burger-menu__line--middle').css('opacity', '1');
        $('.burger-menu__line--top').css('transform', 'rotate(0)');
        $('.burger-menu__line--bottom').css('transform', 'rotate(0');
        
    }

    $('.burger-menu').click(() => {
        if (!navOpen) {
            burgerOpen();
            
            $('.nav-container').css('width', '100%');
            $('.nav-container').css('height', '100%');            
            navOpen = true;
        }else{
            $('.nav-container').css('width', '3.125rem');
            $('.nav-container').css('height', '3.125rem');
                        
            burgerClose();
            navOpen = false;
        }
    });


    //animation of nav__links
    var turn = false;
    $('.nav__link-wrapper').hover(function () {
        if (!turn) {
            $(this).children(':first').toggleClass('link-up');
            $(this).children(':last').toggleClass('bottom-down');
            turn = true;
        } else {
            $(this).children(':first').toggleClass('link-up');
            $(this).children(':last').toggleClass('bottom-down');
            turn = false;
        }
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
    const modal = $('.modal'),
        modalCloseBtn = $('.modal__btn--close');
    imgWrapper = $('.modal__img-wrapper');

    const openModal = () => {
        modal.removeClass('closed');
        modal.css('opacity', '1');
    }

    const closeModal = () => {
        modal.addClass('closed');
    }

    const getImgRatio = (attr) => {
        var imgRatio = attr;
        let isAcross = /acr/;
        return isAcross.test(imgRatio);
    }

    const setImg = (src, ratio) => {
        if (ratio) {
            imgWrapper.append('<img src="' + src + '" class="acr">');
        } else {
            imgWrapper.append('<img src="' + src + '" class="up">');
        }
    }

    $('.gallery__img').click(function () {
        var img = $(this).attr("src");
        setImg(img, getImgRatio(img));
        openModal();
    });

    modalCloseBtn.click(function () {
        closeModal();
        imgWrapper.empty();
    });





});