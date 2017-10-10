function sliderForClients() {
    const sliderClients = document.querySelector('.slider-clients')
    const slides = sliderClients.querySelectorAll('.slide')
    const minDif = 2
    const limit = - (slides.length - 1) * 100
    let startPos = null
    let lastMove = null

    const rememberLastMove = event => lastMove = event

    function moveSlider() {
        const endPos = lastMove.touches[0].clientX
        const previousValue = parseInt(sliderClients.style.left) || 0 

        sliderClients.style.left = endPos > startPos
        ? 
            previousValue !== 0 
            ? `${previousValue + 100}%`
            : sliderClients.style.left
        :   
            previousValue !== limit
            ? `${previousValue - 100}%`
            : sliderClients.style.left

        sliderClients.removeEventListener('touchmove', rememberLastMove)
        sliderClients.removeEventListener('touchend', moveSlider)
    }

    sliderClients.addEventListener('touchstart', event => {
        startPos = event.touches[0].clientX

        sliderClients.addEventListener('touchmove', rememberLastMove)
        sliderClients.addEventListener('touchend', moveSlider)
    })
}

sliderForClients()