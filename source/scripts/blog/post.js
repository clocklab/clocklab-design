//=include ./modules/post/transition-end.js

document.querySelector('#logo').classList.add('dark');
document.querySelector('#menu').classList.add('dark');

document.addEventListener('DOMContentLoaded', () => {
    $('#clock-bg').textshadow({
        color: 'rgba(0, 0, 0, .05)',
        textShadow: true
    });
});