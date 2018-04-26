//= include ./components/open-form.js

//= include ./components/scroll-menu.js

new WOW().init();

$(document).ready(function(){
    $(".scroll").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
});