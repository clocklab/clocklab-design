document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const topPanel = document.querySelector('.top-panel')
    const events = ['wheel', 'keydown']
    const animationTime = 1000
    const animationDeltaTime = 600
    const minLimit = - 30
    const maxLimit = 30
    // const lightSlides = [1, 3, 4, 5, 10, 12, 13, 16]
    let flag = true
    let firstLap = true
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

    setTopPanelStyle = index => {
        const background = getComputedStyle(slides[index]).backgroundColor.replace(/rgb|rgba|\(|\)/g, '').split(', ')

        setTimeout(() => {
            background.filter(number => number < 100).length
            ? topPanel.classList.remove('dark')
            : topPanel.classList.add('dark')
        })
    }

    const freezeEvents = event => {
        if (event.deltaY) {
            if (event.deltaY > maxLimit || event.deltaY < minLimit) checkFlag(event)
        } else {
            checkFlag(event)
        }
    }

    const moveToNext = index => {
        slides[index + 1]
        ? slides[index + 1].classList.add('current') 
        : slides[0].classList.add('current')
    }
    
    const moveToPrevious = index => {
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
        }, animationTime + animationDeltaTime)
    }
    
    const move = event => {
        const previousSlide = document.querySelector('.screen-block.previous') || document.querySelector('.screen-block.previous-back');
        const currentSlide = document.querySelector('.screen-block.current') || document.querySelector('.screen-block.current-back');
        const index = slides.indexOf(currentSlide);
        
        if (event.deltaY > 0 || event.keyCode === 40) {
            setClasses(currentSlide, previousSlide, 'previous')
            resetAnimation(currentSlide, 'previous')
            moveToNext(index)

            slides[0].classList.contains('first-slide') && slides[0].classList.remove('first-slide')
            topPanel.classList.add('back')

            setTimeout(() => {
                topPanel.classList.remove('back')
            }, animationDeltaTime)

            setTopPanelStyle(slides[index + 1] ? index + 1 : 0)

            if (index === slides.length - 1) firstLap = false
        }

        if (event.deltaY < 0 || event.keyCode === 38) {
            if (firstLap) {
                if (slides[index - 1]) {
                    setClasses(currentSlide, previousSlide, 'previous-back')
                    resetAnimation(currentSlide, 'previous-back')
                    setTopPanelStyle(slides[index - 1] ? index - 1 : slides.length - 1)

                    setTimeout(() => {
                        topPanel.classList.remove('back');
                    }, animationDeltaTime)

                    slides[index - 1].classList.add('current-back')
                    topPanel.classList.add('back')
                }
            } else {
                setClasses(currentSlide, previousSlide, 'previous-back')
                resetAnimation(currentSlide, 'previous-back')
                moveToPrevious(index)
                setTopPanelStyle(slides[index - 1] ? index - 1 : slides.length - 1)

                setTimeout(() => {
                    topPanel.classList.remove('back');
                }, animationDeltaTime)

                topPanel.classList.add('back')
            }
        }
    }
    
    addListeners()
    
    slides[0].classList.add('current')
    slides[0].classList.add('first-slide')
})