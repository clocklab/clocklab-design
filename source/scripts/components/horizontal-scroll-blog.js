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
        frontLayer.firstElementChild.style.cursor = ''
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        
        frontLayer.removeEventListener('mousemove', moveObjects)
        frontLayer.removeEventListener('mouseup', removeEvents)
        frontLayer.removeEventListener('mouseleave', removeEvents)
    } 

    frontLayer.addEventListener('mousedown', event => {
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        frontLayer.firstElementChild.style.cursor = '-webkit-grabbing'

        frontLayer.addEventListener('mousemove', moveObjects)
        frontLayer.addEventListener('mouseup', removeEvents)
        frontLayer.addEventListener('mouseleave', removeEvents)
    })
})