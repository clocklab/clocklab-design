// ~~~~~~~ Watches ~~~~~~~
;(function() {
    var categories = [].slice.call(document.querySelectorAll('#categories .categories__item'));
    var subCategories = [].slice.call(document.querySelectorAll('#subcategories .subcategories__item'));
    var slidesMinutes = [].slice.call(document.querySelectorAll('#minutes .flip-list__item'));
    var slidesSeconds = [].slice.call(document.querySelectorAll('#seconds .flip-list__item'));
    var ANIMATION_TIME = 5000;


    function changeService() {
        var activeCategory = document.querySelector('#categories .active');
        var activeSubCategory = document.querySelector('#subcategories .active');
        var activeIndex = categories.indexOf(activeCategory);
        var nextIndex = activeIndex + 1;

        activeCategory.classList.remove('active');
        activeSubCategory.classList.remove('active');

        if (categories[nextIndex]) {
            categories[nextIndex].classList.add('active');
            subCategories[nextIndex].classList.add('active');
        } else {
            categories[0].classList.add('active');
            subCategories[0].classList.add('active');
        }
    }

    function changeSlide() {
        var activeMinutes = document.querySelector('#minutes .active');
        var previousMinutes = document.querySelector('#minutes .previous');
        var activeSeconds = document.querySelector('#seconds .active');
        var previousSeconds = document.querySelector('#seconds .previous');
        var activeIndex;
        var nextIndex;

        activeIndex = activeMinutes ? slidesMinutes.indexOf(activeMinutes) : 0;
        nextIndex = activeIndex + 1;

        previousMinutes && previousMinutes.classList.remove('previous');
        previousSeconds && previousSeconds.classList.remove('previous');

        if (activeMinutes) {
            activeMinutes.classList.remove('active');
            activeMinutes.classList.add('previous');
            activeSeconds.classList.remove('active');
            activeSeconds.classList.add('previous');
        } else {
            slidesMinutes[activeIndex].classList.add('previous');
            slidesSeconds[activeIndex].classList.add('previous');
        }

        if (slidesMinutes[nextIndex]) {
            slidesMinutes[nextIndex].classList.add('active');
            slidesSeconds[nextIndex].classList.add('active');
        } else {
            slidesMinutes[0].classList.add('active');
            slidesSeconds[0].classList.add('active');
        }
    }


    setInterval(changeService, ANIMATION_TIME);
    setInterval(changeSlide, ANIMATION_TIME);
})();

// ~~~~~~~ Scroll Line (Header) ~~~~~~~
;(function() {
    var scrollLine = document.querySelector('#scroll-line');
    var aboutUs = document.querySelector('#about-us');

    if (aboutUs) {
        scrollLine.addEventListener('click', () => {
            var elScroll = aboutUs.getBoundingClientRect().top;
            var windowScroll = window.pageYOffset;
            var wantedScroll = windowScroll + elScroll;

            window.scroll({
                top: wantedScroll,
                behavior: 'smooth'
            });
        });
    }
})();

// ~~~~~~~ Slider ~~~~~~~
;(function() {
    var openCloseBtn = document.querySelector('#open-work');
    var skipBtn = document.querySelector('#skip');
    var ourWorks = document.querySelector('#our-works');
    var questions = document.querySelector('#questions');
    var aboutUs = document.querySelector('#about-us');
    var sliderContent = document.querySelector('#slider .slider__content');
    var slides = document.querySelectorAll('#slider .slider__slide');
    var limit = slides.length;
    var counter = 0;
    var DELTA = 50;
    let startTouchPos = null;
    let lastMove = null;


    function showHideInfo() {
        slides[counter].classList.toggle('opened');
        this.classList.toggle('opened');
    }

    function checkElementTopPos() {
        if (!questions.getBoundingClientRect().top) {
            document.body.removeAttribute('style');
            window.removeEventListener('scroll', checkElementTopPos);
        }
    }

    function skipToBottom() {
        removeDocumentListeners();
        window.removeEventListener('scroll', stopDownScroll);

        window.scroll({
            top: window.pageYOffset + questions.getBoundingClientRect().top,
            behavior: 'smooth'
        });

        window.addEventListener('scroll', checkElementTopPos);

        // window.addEventListener('scroll', stopTopScroll);
        // skipBtn.removeEventListener('click', skipToBottom);
        // skipBtn.addEventListener('click', skipToTop);
    }

    function skipToTop() {

    }


    // ~~~~~ Slider functions ~~~~~
    function startMove(e) {
        startTouchPos = e.touches[0].clientY;
    }

    function continueMove(e) {
        lastMove = e;
    }

    function endMove() {
        var finishTouchPos = lastMove.touches[0].clientY;

        if (finishTouchPos < startTouchPos) {
            if (counter + 1 >= limit) {
                skipToBottom();
                return;
            }
            ++counter;
        } else {
            if (counter - 1 < 0) {
                skipToTop();
                return;
            }
            --counter;
        }

        sliderContent.style.transform = `translateX(${counter * -100}%)`;
    }
    // ~~~~~ Slider functions ~~~~~


    function removeDocumentListeners() {
        document.removeEventListener('touchstart', startMove);
        document.removeEventListener('touchmove', continueMove);
        document.removeEventListener('touchend', endMove);
    }

    function addDocumentListeners() {
        document.addEventListener('touchstart', startMove);
        document.addEventListener('touchmove', continueMove);
        document.addEventListener('touchend', endMove);
    }
    

    function stopDownScroll() {
        var topPos = ourWorks.getBoundingClientRect().top;

        if (topPos < DELTA) {
            window.scroll({
                top: window.pageYOffset + topPos,
                behavior: 'smooth'
            });
            document.body.style.overflow = 'hidden';
            window.removeEventListener('scroll', stopDownScroll);
            addDocumentListeners();
        }
    }

    // function stopTopScroll() {
    //     var topPos = ourWorks.getBoundingClientRect().top;

    //     if (topPos > -DELTA) {
    //         window.scroll({
    //             top: window.pageYOffset + topPos,
    //             behavior: 'smooth'
    //         });
    //         document.body.style.overflow = 'hidden';
    //         window.removeEventListener('scroll', stopTopScroll);
    //     }
    // }

    
    openCloseBtn.addEventListener('click', showHideInfo);
    skipBtn.addEventListener('click', skipToBottom);
    window.addEventListener('scroll', stopDownScroll);
})();