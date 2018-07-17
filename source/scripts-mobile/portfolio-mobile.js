;(function() {
    var btns = document.querySelectorAll('.case__open-btn');

    function openClose(el) {
        const openedElement = document.querySelector('.opened');
        (openedElement && openedElement !== el) && openedElement.classList.remove('opened');

        if (!el.matches('.opened')) {
            const windowScroll = window.pageYOffset;
            const elScroll = el.getBoundingClientRect().top;
            const wantedScroll = windowScroll + elScroll;

            window.scroll({
                top: wantedScroll,
                behavior: 'smooth'
            });
        }
         
        el.classList.toggle('opened');
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            openClose(btn.parentElement)
        });
    })
})();


// ~~~~~~~~~ MOVE TO COMMON SCRIPTS ~~~~~~~~~
;(function() {
    const logo = document.querySelector('#logo');

    window.addEventListener('scroll', () => {
        window.pageYOffset > 0
        ? logo.classList.add('scrolled')
        : logo.classList.remove('scrolled');
    });
})();