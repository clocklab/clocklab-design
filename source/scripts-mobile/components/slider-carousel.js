function sliderCarousel() {
    const sliderCarousels = document.querySelectorAll('.carousel-slider')
    const minDif = 0
    const bottomLimit = - 100
    const animationTime = 500
    
    // disable vertical scroll when hovering over the block
    jQuery(sliderCarousels).bind('touchmove', function(e) {
        e.preventDefault();
    });
   
    sliderCarousels.forEach(sliderCarousel => {
        const slides = sliderCarousel.querySelectorAll('.carousel-slider__item')
        const dots = Array.prototype.slice.call(sliderCarousel.parentElement.querySelectorAll('.carousel-slider-wrapper .dots .dot'))
        const topLimit = - (slides.length - 2) * 100
        let koef = 0.8
        let sliderCarouselWrapperWidth = null
        let startTouchPos = null
        let startLeftValue = null
        let lastMove = null
    
        sliderCarousel.style.left = '-100%'
    
        const setPoints = event => {
            sliderCarouselWrapperWidth = sliderCarousel.parentElement.getBoundingClientRect().width
            startTouchPos = event.touches[0].clientX
            startLeftValue = parseInt(sliderCarousel.style.left) || 0
    
            sliderCarousel.addEventListener('touchmove', moveSlider)
            sliderCarousel.addEventListener('touchend', setLeftPosition)
        }
    
        const moveSlider = event => {
            // lastMove = event
    
            // const endTouchPos = lastMove.touches[0].clientX
            // const previousLeftValue = parseInt(sliderCarousel.style.left) || 0 
    
            // sliderCarousel.style.left = `${startLeftValue + (endTouchPos - startTouchPos) / sliderCarouselWrapperWidth * 100 * koef}%`
        }
    
        const changeActiveDot = direction => {
            const activeDot = dots.filter(dot => dot.classList.contains('active'))[0]
    
            activeDot.classList.remove('active')
    
            direction === 'next'
            ? activeDot.nextElementSibling.classList.add('active')
            : activeDot.previousElementSibling.classList.add('active')
        }
    
        const resetCarousel = resetPoint => {
            setTimeout(() => {
                sliderCarousel.style.left = resetPoint === 'end'
                ? `${topLimit}%`
                : `${bottomLimit}%` 
            }, animationTime)
        }
    
        const setLeftPosition = () => {
            const endTouchPos = lastMove && lastMove.touches[0].clientX
            const dif = Math.abs(endTouchPos - startTouchPos) / sliderCarouselWrapperWidth
    
            sliderCarousel.style.transition = `left ${animationTime}ms ease`
    
            sliderCarousel.style.left = dif < minDif
            ? `${startLeftValue}%`
            : 
                endTouchPos > startTouchPos
                ? `${startLeftValue + 100}%`
                : `${startLeftValue - 100}%`
    
              if (dif > minDif) {
                endTouchPos > startTouchPos
                ? startLeftValue === bottomLimit && resetCarousel('end')
                : startLeftValue === topLimit && resetCarousel('start')
    
                if (endTouchPos > startTouchPos) {
                    switch (startLeftValue) {
                        case bottomLimit:
                            console.log('bottomLimit')
                            dots[dots.length - 1].classList.remove('small')
                            dots[dots.length - 1].classList.add('active')
                            dots[0].classList.remove('active')
                            dots[0].classList.add('small')
                            break
                        case topLimit:
                        case topLimit + 100:
                            console.log('topLimit, topLimit + 100')
                            changeActiveDot('prev')
                            break
                        case topLimit + 200:
                            console.log('topLimit + 200')
                            if (topLimit + 200 === bottomLimit + 200) {
                                dots[0].classList.remove('small')
                            }
                            if (!dots[1].classList.contains('active')) {
                                changeActiveDot('prev')
                            }
                            dots[dots.length + 1].classList.add('small')
                            break
                        case bottomLimit + 200:
                            console.log('bottomLimit + 200')
                            if (!dots[1].classList.contains('active')) {
                                changeActiveDot('prev')
                            }
                            dots[0].classList.remove('small')
                            break
                        case bottomLimit + 100:
                            console.log('bottomLimit - 100')
                            changeActiveDot('prev')
                            break   
                        default:
                            console.log('default')
                            if (!dots[1].classList.contains('active')) {
                                changeActiveDot('prev')
                            }
                            break
                    }
                } else {
                    switch (startLeftValue) {
                        case topLimit:
                            console.log('topLimint')
                            dots[dots.length - 1].classList.remove('active')
                            dots[dots.length - 1].classList.add('small')
                            dots[0].classList.remove('small')
                            dots[0].classList.add('active')
                            break
                        case bottomLimit:
                        case bottomLimit - 100:
                            console.log('bottomLimit, bottomLimit - 100')
                            changeActiveDot('next')
                            break
                        case bottomLimit - 200:
                            console.log('bottomLimit - 200')
                            if (bottomLimit - 200 === topLimit + 200) {
                                dots[dots.length - 1].classList.remove('small')    
                            }
                            dots[0].classList.add('small')
                            break
                        case topLimit + 200:
                            console.log('topLimit + 200')
                            if (!dots[2].classList.contains('active')) {
                                changeActiveDot('next')
                            }
                            dots[dots.length - 1].classList.remove('small')
                            break
                        case topLimit + 100:
                            console.log('topLimit + 100')
                            changeActiveDot('next')
                            break
                        default:
                            console.log('default')
                            if (!dots[2].classList.contains('active')) {
                                changeActiveDot('next')
                            }
                            break
                    }
                }
            }
    
            setTimeout(() => {
                sliderCarousel.style.transition = null
                sliderCarousel.addEventListener('touchstart', setPoints)
            }, animationTime)
            
            sliderCarousel.removeEventListener('touchstart', setPoints)
            sliderCarousel.removeEventListener('touchmove', moveSlider)
            sliderCarousel.removeEventListener('touchend', setLeftPosition)
        }
    
        sliderCarousel.addEventListener('touchstart', setPoints)
    })
}

sliderCarousel()