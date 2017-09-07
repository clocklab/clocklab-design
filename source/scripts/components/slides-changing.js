document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = ['wheel', 'scroll', 'keydown']
    const animationTime = 500
    let freezer
    let flag = true
    
    const addListeners = () => events.forEach(event => document.addEventListener(event, freezeEvents))

    const freezeEvents = () => {
        if (flag) {
            move()
            flag = !flag
        }

        freezer && clearTimeout(freezer)

        freezer = setTimeout(() => {
            flag = !flag
        }, animationTime)
    }

    const moveToNext = index => {
        slides[index + 1]
        ? slides[index + 1].classList.add('current') 
        : slides[0].classList.add('current')
    }
    
    const moveToPrevious = (index) => {
        slides[index - 1]
        ? slides[index - 1].classList.add('current')
        : slides[slides.length - 1].classList.add('current')
    }
    
    const move = () => {
        const previousSlide = document.querySelector('.screen-block.previous');
        const currentSlide = document.querySelector('.screen-block.current');
        const index = slides.indexOf(currentSlide);
        
        if (event.deltaY < 0 || event.keyCode === 40) {
            previousSlide && previousSlide.classList.remove('previous');
            currentSlide.classList.remove('current');
            currentSlide.classList.add('previous');  

            moveToNext(index)
        }

        if (event.deltaY > 0 || event.keyCode === 38) {
            previousSlide && previousSlide.classList.remove('previous');
            currentSlide.classList.remove('current');
            currentSlide.classList.add('previous');  

            moveToPrevious(index)
        }
    }
    
    addListeners()
    
    slides[0].classList.add('current')


    // --- MENU ---
    const openCloseBtns = document.querySelectorAll('.menu__item--open-close'),
          animationTimeMenu = 1600

    function openMenu (event) {
        event.preventDefault()

        flag = !flag

        const menu = this.parentElement
        const menuBackground = menu.querySelector('.menu__background')

        menu.classList.add('opened')
        document.body.style.overflow = 'hidden'

        this.removeEventListener('click', openMenu)

        function closeMenu (event) {
            event.preventDefault()

            flag = !flag

            menu.classList.remove('opened')
            menuBackground.removeEventListener('click', closeMenu)
            this.removeEventListener('click', closeMenu)
            document.body.removeAttribute('style')

            setTimeout(() => {
                this.addEventListener('click', openMenu)
            }, animationTimeMenu)
        }
        
        setTimeout(() => {
            this.addEventListener('click', closeMenu)
            menuBackground.addEventListener('click', closeMenu)
        }, animationTimeMenu)
    }

    openCloseBtns.forEach(openCloseBtn => {
        openCloseBtn.addEventListener('click', openMenu)  
    })
})