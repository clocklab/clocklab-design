document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = ['wheel', 'scroll', 'keydown']
    const animationTime = 1000
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
})