var opened = false;
$('.open-work').text('Информация о проекте');

$('.open-work').click(function() {
    (!opened) ? (
        $('.logo, .menu').fadeOut(190),
        $('.opened-work').addClass('opened fadeInWork'),
        $('.work-title, .dots, .skip').addClass('transition'),
        $('.opened-work').removeClass('fadeOutWork'),
        $('.work, .portfolio').bind('touchmove', false),
        window.setTimeout(function() {
            $('.open-work').text('Закрыть').addClass('white');
        }, 190)
    ) : (
        $('.logo, .menu').fadeIn(190),
        $('.opened-work').removeClass('opened fadeInWork'),
        $('.work-title, .dots, .skip').removeClass('transition'),
        $('.opened-work').addClass('fadeOutWork'),
        $('.work, .portfolio').unbind('touchmove', false),
        window.setTimeout(function() {
            $('.open-work').text('Информация о проекте').removeClass('white');
        }, 190)
    );

    opened = !opened;
});

var link = [
  "/razrabotka-i-prodvizhenie-sayta-audi",
  "/razrabotka-langing-page-euroclub",
  "/razrabotka-sayta-dokument-servisa-dela-ua"
];

$(function() {
    var addLink = $('.open-link');

    addLink.click(function() {
        $('.open-link a').attr('href', link[length]);
    });
});

$('.open-form, .close-form').click(function() {
    (!opened) ?
        $('.logo, .menu').fadeOut(190) :
        $('.logo, .menu').fadeIn(190);
        
    opened = !opened;
});