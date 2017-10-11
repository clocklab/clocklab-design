function sliderForClients() {
    const sliderClients = document.querySelector('.slider-clients')
    const slides = sliderClients.querySelectorAll('.slide')
    const dots = document.querySelector('.our-clients .dots')
    const minDif = 0.2
    const limit = - (slides.length - 1) * 100
    const animationTime = 300
    let koef = 0.8
    let sliderClientsWrapperWidth = null
    let startTouchPos = null
    let startLeftValue = null
    let lastMove = null

    const moveSlider = event => {
        lastMove = event

        const endTouchPos = lastMove.touches[0].clientX
        const previousLeftValue = parseInt(sliderClients.style.left) || 0 

        sliderClients.style.left = `${startLeftValue + (endTouchPos - startTouchPos) / sliderClientsWrapperWidth * 100 * koef}%`
    }

    const changeActiveDot = direction => {
        const activeDot = dots.querySelector('.active')

        activeDot.classList.remove('active')
        direction === 'next'
        ? activeDot.nextElementSibling.classList.add('active')
        : activeDot.previousElementSibling.classList.add('active')
    }

    const setLeftPosition = () => {
        const endTouchPos = lastMove.touches[0].clientX
        const dif = Math.abs(endTouchPos - startTouchPos) / sliderClientsWrapperWidth

        sliderClients.style.transition = `left ${animationTime}ms ease`

        sliderClients.style.left = dif < minDif
        ? `${startLeftValue}%`
        :
            endTouchPos > startTouchPos
            ? 
                startLeftValue !== 0
                ? `${startLeftValue + 100}%`
                : `${startLeftValue}%`
            : 
                startLeftValue !== limit  
                ? `${startLeftValue - 100}%`
                : `${startLeftValue}%`

        dif > minDif && 
        endTouchPos > startTouchPos
        ? startLeftValue !== 0 && changeActiveDot('prev')
        : startLeftValue !== limit && changeActiveDot('next')

        setTimeout(() => {
            sliderClients.style.transition = null
        }, animationTime + 100)
        
        sliderClients.removeEventListener('touchmove', moveSlider)
        sliderClients.removeEventListener('touchend', setLeftPosition)
    }

    sliderClients.addEventListener('touchstart', event => {
        sliderClientsWrapperWidth = sliderClients.parentElement.getBoundingClientRect().width
        startTouchPos = event.touches[0].clientX
        startLeftValue = parseInt(sliderClients.style.left) || 0

        sliderClients.addEventListener('touchmove', moveSlider)
        sliderClients.addEventListener('touchend', setLeftPosition)
    })
}

sliderForClients()