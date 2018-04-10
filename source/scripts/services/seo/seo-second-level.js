var movingAnswers = document.querySelectorAll('.answers .answer');

for (var i = 0; i < movingAnswers.length; i++) {
    movingAnswers[i].style.left = `${-100 * i}%`;
}


//= include ./../../libraries/jquery.min.js

//= include ./../../components/menu.js

//= include ./../../libraries/wow.js

//= include ./../../components/clock-bg.js

//= include ./../modules/design/clock-bg.js

//= include ./../modules/design/questions.js

//= include ./../modules/web-production/web-production-open-form.js

//= include ./../../components/big-background-letter.js

//= include ./../modules/scroll-menu.js


new WOW().init();