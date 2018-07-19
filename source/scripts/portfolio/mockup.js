;(function() {
    function debounce(f, ms = 20) {
        let timer = null;
        return function (...args) {
            const onComplete = () => {
                f.apply(this, args);
                timer = null;
            }
            if (timer) clearTimeout(timer);
            timer = setTimeout(onComplete, ms);
        };
    }


    const objects = document.querySelectorAll('[data-animated]');
    let windowHeight = window.innerHeight;


    function checkSlide(e) {
        objects.forEach(object => {
            const objPos = object.getBoundingClientRect();
            
            const isShown = ((windowHeight - objPos.top) > 0) && (object.offsetHeight / (windowHeight - objPos.top) < 5);
            const isNotScrolledPast = objPos.bottom > 0;

            isShown && isNotScrolledPast
            ? object.classList.add('active')
            : object.classList.remove('active');
        });
    }

    function changeWindowHeight() {
        windowHeight = window.innerHeight;
        checkSlide();
    }


    checkSlide();

    objects[0].classList.add('active');


    window.addEventListener('scroll', debounce(checkSlide));
    window.addEventListener('resize', debounce(changeWindowHeight, 200));
})();

//=include ./../components/scroll-menu.js