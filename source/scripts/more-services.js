// slides-changing
//= components/slides-changing.js

// menu
//= components/menu.js

//= components/jquery.min.js

//= components/wow.js

//= components/clock-bg.js

new WOW().init();

// ----- change lines and language color -----
$('.light div').children().addClass('light');
$('.dark').children().addClass('dark');

// ----- block-bg -----
$('#clock-bg').textshadow({
    color: 'rgba(0,0,0,.05)',
    textShadow: true
});