;(function() {
    const menu = document.querySelector('#menu');
    const menuSwitcher = document.querySelector('#menu-switcher');

    function changeMenu(e) {
        if (e.target === this ) {
            menu.removeEventListener('transitionend', changeMenu);
            window.pageYOffset && menu.classList.add('scrolled');
            document.body.removeAttribute('style');
        }
    }

    function openMenu() {
        document.body.style.overflow = 'hidden';
        menu.classList.add('opened');
        menu.classList.remove('scrolled');
    }

    function closeMenu() {
        menu.classList.remove('opened');
        menu.addEventListener('transitionend', changeMenu);
    }

    menuSwitcher.addEventListener('click', (e) => {
        e.preventDefault();
        menu.matches('.opened') ? closeMenu() : openMenu();
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