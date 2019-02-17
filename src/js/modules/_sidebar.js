var hamburger = $(".hamburger"); // hamburger individual line class
var line = $(".line"); // hamburger individual line class
var menu = $(".slidenav"); // site navigation
var main = $(".main-body"); // site body content
var footer = $(".footer"); // footer block
var sidebar = $(".book-sidebar"); // sidebar

$(document).ready(function(){

    $('.main-body__content').on( "click", function() {
        console.log('Main has been clicked');
        if ($(menu).hasClass("toggle-menu")) {
            menu.removeClass('toggle-menu');
        }
         if ($(main).hasClass("main-body--active")) {
            main.removeClass('main-body--active');
        }
        if ($(line).hasClass("ico-active")) {
            line.removeClass('ico-active');
        }
        if ($(footer).hasClass("footer--active")) {
            footer.removeClass('footer--active');
        }
    });

    $('.hamburger').on( "click", function() {
        $(line).toggleClass("ico-active");
        $(menu).toggleClass("toggle-menu");
        $(main).toggleClass("main-body--active");
        $(footer).toggleClass("footer--active");
    });

    // On scroll make sidebar sticky on desktop

    $( window ).scroll(function() {
        console.log('Test scroll.');
        var scroll = $( document ).scrollTop();
        if (scroll > 300) {
            sidebar.addClass('sticky-sidebar');
        } else {
            sidebar.removeClass('sticky-sidebar');
        }
    });
});
