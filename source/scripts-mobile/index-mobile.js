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
