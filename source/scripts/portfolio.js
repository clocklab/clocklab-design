//=include ./modules/portfolio/horizontal-scroll.js

$('#clock-bg').textshadow({
    color: 'rgba(0, 0, 0, .2)',
    textShadow: true
});

const buttons = document.querySelectorAll('.info .animated-button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        button.classList.toggle('active');
        button.parentElement.parentElement.parentElement.classList.toggle('active');
    });
});