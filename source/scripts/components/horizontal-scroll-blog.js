document.addEventListener('DOMContentLoaded', () => {

    const frontLayer = document.querySelector('.blog .feed-container')

    let currentScrollLeft = 0
    let currentLeftPos

    const moveFrontLayer = newPos => {
        frontLayer.scrollLeft = currentScrollLeft + newPos
    }

    const moveObjects = () => {
        const newLeftPos = currentLeftPos - event.clientX
        
        moveFrontLayer(newLeftPos)
    }

    const removeEvents = () => {
        frontLayer.firstElementChild.removeAttribute('style')
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        
        document.removeEventListener('mousemove', moveObjects)
        document.removeEventListener('mouseup', removeEvents)
    } 

    frontLayer.addEventListener('mousedown', event => {
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        frontLayer.firstElementChild.style.cursor = '-webkit-grabbing'

        document.addEventListener('mousemove', moveObjects)
        document.addEventListener('mouseup', removeEvents)
    })
})