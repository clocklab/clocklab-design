document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = ['wheel', 'keydown']
    const animationTime = 1000
    const minLimit = - 4
    const maxLimit = 4
    let flag = true
    let freezer
    
    const addListeners = () => events.forEach(event => document.addEventListener(event, freezeEvents))

    const checkFlag = event => {
        if (flag) {
            move(event)

            flag = !flag

            setTimeout(() => {
                flag = !flag
            }, animationTime)
        }
    }

    const freezeEvents = event => {
        if (event.deltaY) {
            if (event.deltaY > maxLimit || event.deltaY < minLimit) checkFlag(event)
        } else {
            checkFlag(event)
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
    
    const move = event => {
        const previousSlide = document.querySelector('.screen-block.previous') || document.querySelector('.screen-block.previous-back');
        const currentSlide = document.querySelector('.screen-block.current') || document.querySelector('.screen-block.current-back');
        const index = slides.indexOf(currentSlide);
        
        if (event.deltaY > 0 || event.keyCode === 40) {
            slides[0].classList.contains('first-slide') && slides[0].classList.remove('first-slide')
            
            if (slides[index + 1]) {
                setClasses(currentSlide, previousSlide, 'previous')
                resetAnimation(currentSlide, 'previous')
                slides[index + 1].classList.add('current') 
            }
        }

        if (event.deltaY < 0 || event.keyCode === 38) {

            if (slides[index - 1]) {
                setClasses(currentSlide, previousSlide, 'previous-back')
                resetAnimation(currentSlide, 'previous-back')
                slides[index - 1].classList.add('current-back')
            }
        }
    }
    
    addListeners()
    
    slides[0].classList.add('current')
    slides[0].classList.add('first-slide')
})