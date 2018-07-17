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
            openClose(btn.parentElement);
        });
    })
})();


// ~~~~~~~~~ MOVE TO COMMON SCRIPTS ~~~~~~~~~
;(function() {
    const menu = document.querySelector('#menu');
    const menuSwitcher = document.querySelector('#menu-switcher');

    menuSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.toggle('opened');
    });
})();

;(function() {
    const logo = document.querySelector('#logo');
    const menu = document.querySelector('#menu');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset) {
            logo.classList.add('scrolled')
            menu.classList.add('scrolled')
        } else {
            logo.classList.remove('scrolled');
            menu.classList.remove('scrolled');
        }
    });
})();