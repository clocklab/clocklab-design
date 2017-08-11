// ----- wowjs -----
new WOW().init();

// ----- text shadow -----
$(function() {
    $('#bg-clock').textshadow({
      color: 'rgba(0,0,0,.05)',
      textShadow: true
    });
});

$(window).on('load', function() {
    
    // ----- preloader -----
    var $preloader = $('#preloader'),
        $spinner = $preloader.find('.spinner');
        $preloader.delay(100).fadeOut('slow');
        $spinner.fadeOut();

    // ----- clock -----
    (function() {
      initLocalClocks();
      moveSecondHands();
      setUpMinuteHands();
    })();
});

// ----- menu -----
$(document).ready(function() {
    var opened = false;

    $('.button').click(function() {
        (!opened) ? (
        	$('.open').css('display', 'none'),
        	$('.close').css('display', 'block'),
            $('.phone').stop(true, true).fadeIn({
            	duration: 0, queue: false
            }).slideDown(0)
        ) : (
        	$('.open').css('display', 'block'),
        	$('.close').css('display', 'none'),
            $('.phone').stop(true, true).fadeOut({
            	duration: 0, queue: false
            }).slideUp(0)
        );
            
        opened = !opened;
    });
});