var Flickity = require('flickity');

// NOTE: Brands-Slider
var item_brand = document.querySelector('.brands-slider__container');

var flkty = new Flickity(item_brand, ({
    // options
    prevNextButtons: true,
    pageDots: false,
    contain: true,
    freeScroll: true,
    wrapAround: true,
    autoPlay: 3000,
}), 'groupCells', 4);

// NOTE: Testimonial-Slider


// NOTE: Feature-Slider
