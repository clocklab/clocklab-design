document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = [/*'wheel', 'scroll', */'keydown']
    const animationTime = 1000
    let freezer
    let flag = true
    
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

    const moveToNext = index => {
        slides[index + 1]
        ? slides[index + 1].classList.add('current') 
        : slides[0].classList.add('current')
    }
    
    const moveToPrevious = (index) => {
        slides[index - 1]
        ? slides[index - 1].classList.add('current-back')
        : slides[slides.length - 1].classList.add('current-back')
    }
    
    const move = () => {
        const previousSlide = document.querySelector('.screen-block.previous') || document.querySelector('.screen-block.previous-back');
        const currentSlide = document.querySelector('.screen-block.current') || document.querySelector('.screen-block.current-back');
        const index = slides.indexOf(currentSlide);
        
        if (/*event.deltaY < 0 || */event.keyCode === 40) {
            previousSlide && previousSlide.classList.remove('previous', 'previous-back');
            currentSlide.classList.remove('current', 'current-back');
            currentSlide.classList.add('previous');
            
            //reset animation
            setTimeout(() => {
                currentSlide.classList.remove('previous');
            }, animationTime)

            moveToNext(index)
        }

        if (/*event.deltaY > 0 || */event.keyCode === 38) {
            previousSlide && previousSlide.classList.remove('previous', 'previous-back');
            currentSlide.classList.remove('current', 'current-back');
            currentSlide.classList.add('previous-back');  

            //reset animation
            setTimeout(() => {
                currentSlide.classList.remove('previous-back');
            }, animationTime)

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