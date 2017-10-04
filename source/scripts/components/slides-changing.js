document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = ['wheel', 'keydown']
    const animationTime = 1000
    const minLimit = - 30
    const maxLimit = 30
    let flag = true
    let firstLap = true
    let freezer
    
    const addListeners = () => events.forEach(event => document.addEventListener(event, freezeEvents))

    const checkFlag = () => {
        if (flag) {
            move()

            flag = !flag

            setTimeout(() => {
                flag = !flag
            }, animationTime)
        }
    }

    const freezeEvents = () => {
        if (event.deltaY) {
            if (event.deltaY > maxLimit || event.deltaY < minLimit) checkFlag()
        } else {
            checkFlag()
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
        
        if (event.deltaY > 0 || event.keyCode === 40) {
            setClasses(currentSlide, previousSlide, 'previous')
            resetAnimation(currentSlide, 'previous')
            moveToNext(index)

            slides[0].classList.contains('first-slide') && slides[0].classList.remove('first-slide')

            if (index === slides.length - 1) firstLap = false
        }

        if (event.deltaY < 0 || event.keyCode === 38) {
            if (firstLap) {
                if (slides[index - 1]) {
                    setClasses(currentSlide, previousSlide, 'previous-back')
                    resetAnimation(currentSlide, 'previous-back')
                    slides[index - 1].classList.add('current-back')
                }
            } else {
                setClasses(currentSlide, previousSlide, 'previous-back')
                resetAnimation(currentSlide, 'previous-back')
                moveToPrevious(index)
            }
        }
    }
    
    addListeners()
    
    slides[0].classList.add('current')
    slides[0].classList.add('first-slide')
})