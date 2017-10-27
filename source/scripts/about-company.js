//= include ./libraries/jquery.min.js

//= include ./libraries/wow.js

//= include ./components/menu.js

//= include ./components/jelly-button.min.js

//= include ./components/big-background-letter.js

//= include ./services/modules/web-production/web-production-open-form.js

//= include ./services/modules/scroll-menu.js

/*
//= include ./services/modules/open-long-read.js
//= include ./components/slides-changing-services.js
*/

// ----- change lines and language color -----
$('.light div').children().addClass('light');
$('.dark').children().addClass('dark');

new WOW().init();