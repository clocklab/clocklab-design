//    //= include ./libraries/jquery-3.2.1.min.js

//    //= include ./libraries/wow.js

//    //= include ./components/menu.js

//    //= include ./components/scroll-menu.js

//    //= include ./components/pop-ups.js

//    //= include ./components/anchors.js

//    new WOW().init();


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
