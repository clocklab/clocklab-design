document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = ['wheel', 'keydown']
    const animationTime = 1000
    let flag = true
    let freezer
    
    const addListeners = () => events.forEach(event => document.addEventListener(event, freezeEvents))

    const freezeEvents = () => {
        if (flag) {
            move()

            flag = !flag

            setTimeout(() => {
                flag = !flag
            }, animationTime)
        }
    }
    
    const setClasses = (currentSlide, previousSlide, currentClass) => {
        previousSlide && previousSlide.classList.remove('previous', 'previous-back');
        currentSlide.classList.remove('current', 'current-back');
        currentSlide.classList.add(currentClass);
    }

    const resetAnimation = (currentSlide, currentClass) => {
        setTimeout(() => {
            currentSlide.classList.remove(currentClass);
        }, animationTime)
    }
    
    const move = () => {
        const previousSlide = document.querySelector('.screen-block.previous') || document.querySelector('.screen-block.previous-back');
        const currentSlide = document.querySelector('.screen-block.current') || document.querySelector('.screen-block.current-back');
        const index = slides.indexOf(currentSlide);
        
        if (event.deltaY < 0 || event.keyCode === 40) {
            if (slides[index + 1]) {
                setClasses(currentSlide, previousSlide, 'previous')
                resetAnimation(currentSlide, 'previous')
                slides[index + 1].classList.add('current') 
            }
        }

        if (event.deltaY > 0 || event.keyCode === 38) {
            if (slides[index - 1]) {
                setClasses(currentSlide, previousSlide, 'previous-back')
                resetAnimation(currentSlide, 'previous-back')
                slides[index - 1].classList.add('current-back')
            }
        }
    }

    const changeFirstSlideAnimation = () => {
        slides[0].classList.remove('first-slide')
        
        events.forEach(event => {
            document.removeEventListener(event, changeFirstSlideAnimation)
        })    
    }

    events.forEach(event => {
        document.addEventListener(event, changeFirstSlideAnimation)
    })
    
    addListeners()
    
    slides[0].classList.add('current')
    slides[0].classList.add('first-slide')


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