document.addEventListener('DOMContentLoaded', () => {
    const letterC = document.querySelector('.portfolio .letter-c')
    const letterO = document.querySelector('.portfolio .letter-o')

    const minLeftPos = letterC.getBoundingClientRect().left
    const maxLeftPos = letterO.getBoundingClientRect().left
    const difPos = maxLeftPos - minLeftPos;

    const frontLayer = document.querySelector('.portfolio .front-layer')
    const content = document.querySelector('.portfolio .front-layer .content-container .portfolio-item:last-child')
    const difWidth = content.getBoundingClientRect().right - frontLayer.offsetWidth

    const portfolioLinks = document.querySelectorAll('.portfolio a.image-container')

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

    const moveObjects = event => {
        const newLeftPos = currentLeftPos - event.clientX
        
        moveFrontLayer(newLeftPos)
    }

    const removeEvents = event => {
        frontLayer.removeAttribute('style')
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        
        document.removeEventListener('mousemove', moveObjects)
        document.removeEventListener('mouseup', removeEvents)
    }

    frontLayer.addEventListener('scroll', () => {
        const newLeftPos = frontLayer.scrollLeft * koef

        moveLetters(newLeftPos)
    })    

    function goToPage() {
        this.removeEventListener('mouseup', goToPage)
        document.location.href = this.href
    }

    function preventGoToPage(event) {
        event.preventDefault()
        this.removeEventListener('click', preventGoToPage)
    }

    portfolioLinks.forEach(link => {
        link.addEventListener('mousedown', event => {
            event.preventDefault()

            link.addEventListener('mouseup', goToPage)

            link.addEventListener('mousemove', () => {
                link.removeEventListener('mouseup', goToPage)
                link.addEventListener('click', preventGoToPage)
            })
        })
    })

    document.addEventListener('mousedown', event => {
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        frontLayer.style.cursor = '-webkit-grabbing'

        document.addEventListener('mousemove', moveObjects)
        document.addEventListener('mouseup', removeEvents)
    })
})