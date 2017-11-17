document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu-mobile')
    const logo = document.querySelector('.logo-mobile')
    const blocks = document.querySelectorAll('.global-container > div');
    const delay = 500
    const delta = 20

    const addClasses = (arr, wantedClass) => {
        arr.forEach(el => {
            !el.classList.contains(wantedClass) && el.classList.add(wantedClass)
        })
    }

    const removeClasses = (arr, unwantedClass) => {
        arr.forEach(el => {
            el.classList.contains(unwantedClass) && el.classList.remove(unwantedClass)
        })
    }

    const checkCurrentBlockBackground = () => {
        blocks.forEach(block => {
            if (block.getBoundingClientRect().top <= delta && block.getBoundingClientRect().bottom >= delta) {
                const background = getComputedStyle(block).backgroundColor.replace(/rgba?|\(|\)/g, '').split(', ')

                background.filter(number => number < 100).length
                ? removeClasses([logo, menu], 'dark')
                : addClasses([logo, menu], 'dark')
            } 
        })
    }

    document.addEventListener('scroll', () => {
        document.documentElement.scrollTop >= delta || document.body.scrollTop >= delta
        ? addClasses([logo, menu], 'scrolled')
        : removeClasses([logo, menu], 'scrolled')

        checkCurrentBlockBackground()    
    })

    checkCurrentBlockBackground()
})