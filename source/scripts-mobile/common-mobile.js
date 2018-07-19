;(function() {
    const menu = document.querySelector('#menu');
    const menuSwitcher = document.querySelector('#menu-switcher');
    const languages = document.querySelector('#languages');

    function changeMenu(e) {
        if (e.target === this ) {
            menu.removeEventListener('transitionend', changeMenu);
            window.pageYOffset && menu.classList.add('scrolled');
            document.body.removeAttribute('style');
            menuSwitcher.addEventListener('click', toggleMenu);
        }
    }

    function addListener(e) {
        languages.removeEventListener('transitionend', addListener);
        menuSwitcher.addEventListener('click', toggleMenu);
    }

    function openMenu() {
        document.body.style.overflow = 'hidden';
        menu.classList.add('opened');
        menu.classList.remove('scrolled');
        languages.addEventListener('transitionend', addListener);
    }

    function closeMenu() {
        menu.classList.remove('opened');
        menu.addEventListener('transitionend', changeMenu);
    }

    function toggleMenu() {
        menuSwitcher.removeEventListener('click', toggleMenu);
        menu.matches('.opened') ? closeMenu() : openMenu();
    }

    menuSwitcher.addEventListener('click', toggleMenu);
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


;(function() {
    const btn = document.querySelector('#scroll-to-top');

    btn && btn.addEventListener('click', () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    })
})();


;(function() {
    const openBtn = document.querySelector('#open-form');

    if (openBtn) {
        const form = document.querySelector('#form');
        const closeBtn = form.querySelector('#close-form');
        const inputs = form.querySelectorAll('.form__field');


        function openForm() {
            form.classList.add('opened');
            document.body.style.overflow = 'hidden';
        }

        function closeForm() {
            form.classList.remove('opened');
            document.body.removeAttribute('style');
        }

        function checkInput() {
            this.value.trim()
            ? this.classList.add('filled')
            : this.classList.remove('filled');
        }


        inputs.forEach(input => input.addEventListener('blur', checkInput));
        openBtn.addEventListener('click', openForm);
        closeBtn.addEventListener('click', closeForm);
    }
})();