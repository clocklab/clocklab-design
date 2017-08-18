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

    // ----- text shadow -----
    $('#bg-clock').textshadow({
      color: 'rgba(0,0,0,.05)',
      textShadow: true
    });

    // ----- change logo and menu color -----
    $('.black a').children().addClass('black');
    $('.gray').children().addClass('gray');
});