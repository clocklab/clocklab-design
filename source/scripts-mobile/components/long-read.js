document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.open-close-long-read')
    const longRead = document.querySelector('.long-read')
    const longReadContainer = longRead.parentElement
    const initialMaxHeight = 380
    const animationTime = 400

    const animate = (draw, duration) => {
        const start = performance.now();
        
        requestAnimationFrame(function animate(time) {
            let timePassed = time - start;
        
            timePassed = timePassed > duration
            ? duration
            : timePassed
        
            draw(timePassed);
        
            timePassed < duration &&
            requestAnimationFrame(animate)
        });
    }

    const checkLongReadBottomPos = ()=> {
        const longReadContainerSizes = longReadContainer.getBoundingClientRect()

        if (longReadContainerSizes.bottom < document.documentElement.clientHeight ||
            longReadContainerSizes.top > 300) {
            openButton.style.position = 'absolute'
            openButton.style.bottom = '40px'
        } else {
            openButton.style.position = 'fixed'
            openButton.style.bottom = '0px'
        }
    }

    const openLongRead = () => {
        const newMaxHeight = longRead.clientHeight

        animate((timePassed) => {
            longReadContainer.style.maxHeight = `${initialMaxHeight + timePassed * newMaxHeight / animationTime}px`
        }, animationTime)   

        setTimeout(() => {
            longReadContainer.removeAttribute('style')
        }, animationTime + 100)

        document.addEventListener('scroll', checkLongReadBottomPos)
    }

    const closeLongRead = () => {
        const currentMaxHeight = longRead.clientHeight

        animate((timePassed) => {
            longReadContainer.style.maxHeight = `${currentMaxHeight - timePassed * (currentMaxHeight - initialMaxHeight) / animationTime}px`
        }, animationTime)

        openButton.removeAttribute('style')

        document.removeEventListener('scroll', checkLongReadBottomPos)
    }

    openButton.addEventListener('click', () => {
        openButton.classList.contains('opened')
        ? closeLongRead()
        : openLongRead()

        openButton.classList.toggle('opened')
    })

    longReadContainer.style.maxHeight = `${initialMaxHeight}px`
})