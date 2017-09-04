document.addEventListener('DOMContentLoaded', () => {
    const letterC = document.querySelector('.portfolio .letter-c')
    const letterO = document.querySelector('.portfolio .letter-o')

    const minLeftPos = letterC.getBoundingClientRect().left
    const maxLeftPos = letterO.getBoundingClientRect().left
    const difPos = maxLeftPos - minLeftPos;

    const frontLayer = document.querySelector('.portfolio .front-layer')
    const content = document.querySelector('.portfolio .front-layer .content-container .portfolio-item:last-child')
    const difWidth = content.getBoundingClientRect().right - frontLayer.offsetWidth

    const koef = difPos / difWidth

    let currentScrollLeft = 0
    let currentLeftPos


    const moveLetters = newPos => {
        letterC.style.transform = `translateX(${newPos}px)`
        letterO.style.transform = `translateX(-${newPos}px)`
    }

    const moveFrontLayer = newPos => {
        frontLayer.scrollLeft = currentScrollLeft + newPos
    }

    const moveObjects = () => {
        const newLeftPos = currentLeftPos - event.clientX
        
        moveFrontLayer(newLeftPos)
    }

    const removeEvents = () => {
        frontLayer.removeAttribute('style')
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        
        frontLayer.removeEventListener('mousemove', moveObjects)
        frontLayer.removeEventListener('mouseup', removeEvents)
        frontLayer.removeEventListener('mouseleave', removeEvents)
    }

    frontLayer.addEventListener('scroll', () => {
        const newLeftPos = frontLayer.scrollLeft * koef

        moveLetters(newLeftPos)
    })    

    frontLayer.addEventListener('mousedown', event => {
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        frontLayer.style.cursor = '-webkit-grabbing'

        frontLayer.addEventListener('mousemove', moveObjects)
        frontLayer.addEventListener('mouseup', removeEvents)
        frontLayer.addEventListener('mouseleave', removeEvents)
    })
})