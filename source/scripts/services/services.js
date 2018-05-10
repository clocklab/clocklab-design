//=include ./../components/open-form.js

//=include ./../components/scroll-menu.js

$('#clock-bg').textshadow({
    color: $('#clock-bg').hasClass('white')
        ? 'rgba(0, 0, 0, .05)'
        : 'rgba(0, 0, 0, 1)',
    textShadow: true
});