// ----- wowjs -----
new WOW().init();

$(window).on('load', function() {
    
    // ----- clock -----
    (function() {
      initLocalClocks();
      moveSecondHands();
      setUpMinuteHands();
    })();
});
$(document).ready(function() {

    // ----- block-bg -----
    $('#clock-bg').textshadow({
      color: 'rgba(0,0,0,.05)',
      textShadow: true
    });

    $('.portfolio #clock-bg').textshadow({
      color: 'rgba(0,0,0,.2)',
      textShadow: true
    });

    // ----- change logo, menu color, lines and languages -----
    $('.light div').children().addClass('light');
    $('.black a').children().addClass('black');
    $('.dark').children().addClass('dark');
    $('.gray').children().addClass('gray');
});