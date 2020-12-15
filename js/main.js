$(document).ready(function () {

    const modal = $('.modal'),
        modalCloseBtn = $('.modal__btn--close');
    imgWrapper = $('.modal__img-wrapper');

    const openModal = () => {
        modal.removeClass('closed');
    }

    const closeModal = () => {
        modal.addClass('closed');
    }

    const getImgSrc = (attr) => {
        var imgSrc = attr;
        let isAcross = /acr/;
        return isAcross.test(imgSrc);
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
        setImg(img, getImgSrc(img));        
        openModal();
    });

    modalCloseBtn.click(function () {
        closeModal();
        imgWrapper.empty();
    });




});