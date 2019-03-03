
var hamburger = $(".line"); // hamburger individual line class
// var sidepanel = $(".sidepanel"); // hamburger individual line class
var menu = $(".slidenav"); // site navigation
var main = $(".main-body"); // site body content

$(document).ready(function(){

    $('.hamburger').on( "click", function() {
        $(hamburger).toggleClass("toggle-ico-active");
        $(menu).toggleClass("toggle-menu");
        // $(sidepanel).toggleClass("toggle-active");
        $(main).toggleClass("main-body--active");
    });

    $(".banner").on( "click", function() {

        if ($(menu).hasClass("toggle-menu")) {
            menu.removeClass('toggle-menu');
        }

        if ($(main).hasClass("main--active")) {
            main.removeClass('main--active');
        }

        if ($(hamburger).hasClass("toggle-ico-active")) {
            hamburger.removeClass('toggle-ico-active');
        }
    });
    //
    // if ($('body').hasClass("HomePage")) {
    //     $(main).scroll(function() {
    //         var scroll = $('.main').scrollTop();
    //         if (scroll >= 500) {
    //             sidepanel.removeClass('hide').addClass("show");
    //         } else {
    //             menu.removeClass('toggle-menu');
    //             main.removeClass('main--active');
    //             hamburger.removeClass('toggle-ico-active');
    //             sidepanel.removeClass("show").addClass('hide');
    //             sidepanel.removeClass("toggle-active").addClass('hide');
    //         }
    //     });
    // }
});
