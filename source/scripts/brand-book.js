// menu
//= components/menu.js

//= components/jquery.min.js

//= components/wow.js

//= components/clock-bg.js

//= components/web-production-clock-bg.js

//= components/big-background-letter.js

//= components/web-production-questions.js

//= components/web-production-open-form.js

new WOW().init();

// ----- change lines and language color -----
$('.light div').children().addClass('light');
$('.dark').children().addClass('dark');

// ----- block-bg -----
$('#clock-bg').textshadow({
    color: 'rgba(0,0,0,.05)',
    textShadow: true
});