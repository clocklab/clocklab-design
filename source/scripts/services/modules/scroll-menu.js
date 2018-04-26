document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#menu');
    const logo = document.querySelector('#logo');
    const blocks = document.querySelectorAll('[data-top-panel-bg]');
    const DELAY = 500;
    const DELTA = 20;

    const addClasses = (arr, wantedClass) => {
        arr.forEach(el => {
            !el.classList.contains(wantedClass) && el.classList.add(wantedClass);
        });
    }

    const removeClasses = (arr, unwantedClass) => {
        arr.forEach(el => {
            el.classList.contains(unwantedClass) && el.classList.remove(unwantedClass);
        })
    }

    const checkCurrentBlockBackground = () => {
        blocks.forEach(block => {
            if (block.getBoundingClientRect().top <= DELTA && block.getBoundingClientRect().bottom >= DELTA) {
                const background = getComputedStyle(block).backgroundColor.replace(/rgba?|\(|\)/g, '').split(', ');

                block.dataset.topPanelBg === 'light'
                ? addClasses([logo, menu], 'dark')
                : removeClasses([logo, menu], 'dark');
            }
        })
    }

    const changeTopPanel = () => {
        window.scrollY >= DELTA
        ? addClasses([logo, menu], 'scrolled')
        : removeClasses([logo, menu], 'scrolled')

        checkCurrentBlockBackground()
    }

    window.addEventListener('scroll', changeTopPanel);
    window.addEventListener('resize', changeTopPanel);

    checkCurrentBlockBackground()
})