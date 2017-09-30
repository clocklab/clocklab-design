//= include ./../../libraries/jquery.min.js

//= include ./../../components/menu.js

//= include ./../../libraries/wow.js

//= include ./../../components/clock-bg.js

//= include ./../../components/big-background-letter.js

//= include ./../modules/web-production/web-production-clock-bg.js

//= include ./../modules/web-production/web-production-questions.js

//= include ./../modules/web-production/web-production-open-form.js

new WOW().init();

// ----- change lines and language color -----
$('.light div').children().addClass('light');
$('.dark').children().addClass('dark');

// ----- block-bg -----
$('#clock-bg').textshadow({
    color: 'rgba(0,0,0,.05)',
    textShadow: true
});