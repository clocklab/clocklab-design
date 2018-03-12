var opened = false;

// view information about the project
$('.open-work').click(function() {
    var name = $(this).data('name');

    (!opened) ? (
        $('#' + name + ' .opened-work').addClass('opened fadeInWork'),
        $('#' + name + ' .opened-work').removeClass('fadeOutWork'),
        $('.work-title, .dots, .skip').addClass('transition'),
        $('.work, .portfolio').bind('touchmove', false),
        window.setTimeout(function() {
            $('#' + name + ' .open-work').text('Закрыть').addClass('white');
        }, 190)
    ) : (
        $('#' + name + ' .opened-work').removeClass('opened fadeInWork'),
        $('#' + name + ' .opened-work').addClass('fadeOutWork'),
        $('.work-title, .dots, .skip').removeClass('transition'),
        $('.work, .portfolio').unbind('touchmove', false),
        window.setTimeout(function() {
            $('#' + name + ' .open-work').text('Информация о проекте').removeClass('white');
        }, 190)
    );

    // disable the animation of logo and menu hiding on the iPad
    (screen.width < 768 && !opened) ?
        $('.logo, .menu').fadeOut(190) :
        $('.logo, .menu').fadeIn(190);

    opened = !opened;
});

// animation of logo and menu hiding when the form appears
$('.open-form, .close-form').click(function() {
    (!opened) ?
        $('.logo, .menu').fadeOut(190) :
        $('.logo, .menu').fadeIn(190);
        
    opened = !opened;
});

link = [
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