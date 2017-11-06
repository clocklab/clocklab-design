document.addEventListener('DOMContentLoaded', () => {
    const letterC = document.querySelector('.portfolio .letter-c')
    const letterO = document.querySelector('.portfolio .letter-o')

    const minLeftPos = letterC.getBoundingClientRect().left
    const maxLeftPos = letterO.getBoundingClientRect().left
    const difPos = maxLeftPos - minLeftPos;

    const frontLayer = document.querySelector('.portfolio .front-layer')
    const content = document.querySelector('.portfolio .front-layer .content-container .portfolio-item:last-child')
    const difWidth = content.getBoundingClientRect().right - frontLayer.offsetWidth

    const navArrows = document.querySelectorAll('.nav-arrows .arrow')

    const portfolioLinks = document.querySelectorAll('.portfolio a.image-container')

    const animationTime = 200

    const koef = difPos / difWidth

    let currentScrollLeft = 0
    let currentLeftPos

    let flag = true


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

    const moveLetters = newPos => {
        letterC.style.transform = `translateX(${newPos}px)`
        letterO.style.transform = `translateX(-${newPos}px)`
    }

    const moveFrontLayer = newPos => {
        frontLayer.scrollLeft = currentScrollLeft + newPos
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
    }

    function moveFrontLayerPartially(event) {
        event.stopPropagation()

        if (flag) {
            const frontLayerWidth = this.classList.contains('arrow--next')
            ? frontLayer.offsetWidth / 3
            : - frontLayer.offsetWidth / 3

            flag = !flag
    
            currentScrollLeft = frontLayer.scrollLeft
    
            animate((timePassed) => {
                frontLayer.scrollLeft = currentScrollLeft + timePassed * frontLayerWidth / animationTime
            }, animationTime)
    
            setTimeout(() => {
                flag = !flag
            }, animationTime + 100)
        }
    }

    const moveObjects = event => {
        const newLeftPos = currentLeftPos - event.clientX
        
        if (!frontLayer.style.pointerEvents && newLeftPos > 3) {
            frontLayer.style.pointerEvents = 'none'
        }

        moveFrontLayer(newLeftPos)
    }

    const removeEvents = event => {
        frontLayer.parentElement.classList.remove('active')
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft

        frontLayer.removeAttribute('style')
        
        document.removeEventListener('mousemove', moveObjects)
        document.removeEventListener('mouseup', removeEvents)
    }

    frontLayer.addEventListener('scroll', () => {
        const newLeftPos = frontLayer.scrollLeft * koef

        moveLetters(newLeftPos)
    })

    frontLayer.addEventListener('wheel', event => {
        currentScrollLeft = frontLayer.scrollLeft

        if (event.deltaY !== 0) {
            event.preventDefault()
            moveFrontLayer(event.deltaY)
        }
    })

    frontLayer.addEventListener('mousedown', event => {
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        frontLayer.parentElement.classList.add('active')

        document.addEventListener('mousemove', moveObjects)
        document.addEventListener('mouseup', removeEvents)
    })

    navArrows.forEach(arrow => {
        arrow.addEventListener('mousedown', moveFrontLayerPartially)
    })
})