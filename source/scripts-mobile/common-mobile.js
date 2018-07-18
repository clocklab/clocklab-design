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
    const blocks = document.querySelectorAll('[data-items-color]');
    const DELTA = 20;

    const addClasses = (arr, wantedClass) => {
        arr.forEach(el => {
            !el.matches(`.${wantedClass}`) && el.classList.add(wantedClass);
        });
    }

    const removeClasses = (arr, unwantedClass) => {
        arr.forEach(el => {
            el.matches(`.${unwantedClass}`) && el.classList.remove(unwantedClass);
        });
    }

    const checkCurrentBlockBackground = () => {
        blocks.forEach(block => {
            if (block.getBoundingClientRect().top <= DELTA && block.getBoundingClientRect().bottom >= DELTA) {
                block.dataset.itemsColor === 'light'
                ? addClasses([logo, menu], 'light')
                : removeClasses([logo, menu], 'light');
            }
        })
    }

    const checkWindowTopPos = () => {
        window.pageYOffset
        ? addClasses([logo, menu], 'scrolled')
        : removeClasses([logo, menu], 'scrolled');
    }

    if (blocks.length > 1) {
        window.addEventListener('scroll', checkCurrentBlockBackground);
        window.addEventListener('resize', checkCurrentBlockBackground);
    }

    window.addEventListener('scroll', checkWindowTopPos);

    checkCurrentBlockBackground();

})();