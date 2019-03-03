var Flickity = require('flickity');

// A $( document ).ready() block.
$( window ).on( "load", function() {
    console.log( "ready!" );

    // NOTE: Brands-Slider
    var item_brand = document.querySelector('.brands-slider__container');

    var flkty = new Flickity(item_brand, ({
        // options
        prevNextButtons: false,
        pageDots: false,
        contain: true,
        freeScroll: true,
        wrapAround: true,
        autoPlay: 3000,
        imagesLoaded: true,
    }), 'groupCells', 4);

    // NOTE: Feature-Slider
    var item_feature = document.querySelector('.casestudy-block__list');

    var flkty = new Flickity(item_feature, ({
        // options
        prevNextButtons: true,
        pageDots: false,
        contain: true,
        freeScroll: true,
        wrapAround: true,
        draggable: false,
        autoPlay: 10000,
        imagesLoaded: true,
    }), 'groupCells', 1);

    // NOTE: Testimonial-Slider
    var item_testimonial = document.querySelector('.testimonial-slider__slider');

    var flkty = new Flickity(item_testimonial, ({
        // options
        prevNextButtons: true,
        pageDots: false,
        contain: true,
        freeScroll: true,
        wrapAround: true,
        draggable: false,
        autoPlay: 10000,
    }), 'groupCells', 1);
});
