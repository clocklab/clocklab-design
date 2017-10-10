document.addEventListener('DOMContentLoaded', () => {

    const frontLayer = document.querySelector('.blog .feed-container')
    const blogLinks = document.querySelectorAll('.blog .feed__post a')
    const images = document.querySelectorAll('.blog img')

    let currentScrollLeft = 0
    let currentLeftPos

    const moveFrontLayer = newPos => {
        frontLayer.scrollLeft = currentScrollLeft + newPos
    }

    const moveObjects = event => {
        const newLeftPos = currentLeftPos - event.clientX
        
        moveFrontLayer(newLeftPos)
    }

    function goToPage() {
        this.removeEventListener('mouseup', goToPage)
        document.location.href = this.href
    }

    function preventGoToPage(event) {
        event.preventDefault()
        this.removeEventListener('click', preventGoToPage)
    }

    const removeEvents = event => {
        frontLayer.classList.remove('active')
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        
        document.removeEventListener('mousemove', moveObjects)
        document.removeEventListener('mouseup', removeEvents)
    } 

    blogLinks.forEach(link => {
        link.addEventListener('mousedown', event => {
            event.preventDefault()

            link.addEventListener('mouseup', goToPage)

            link.addEventListener('mousemove', () => {
                link.removeEventListener('mouseup', goToPage)
                link.addEventListener('click', preventGoToPage)
            })
        })
    })

    images.forEach(image => {
        image.addEventListener('mousedown', event => {
            event.preventDefault()
            return false
        })
    })

    frontLayer.addEventListener('mousedown', event => {
        currentLeftPos = event.clientX
        currentScrollLeft = frontLayer.scrollLeft
        frontLayer.classList.add('active')

        document.addEventListener('mousemove', moveObjects)
        document.addEventListener('mouseup', removeEvents)
    })
})