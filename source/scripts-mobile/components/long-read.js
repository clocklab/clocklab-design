document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.querySelector('.open-close-long-read')
    const longRead = document.querySelector('.long-read')
    const longReadContainer = longRead.parentElement
    const initialMaxHeight = 380
    const animationTime = 400
    let initialBottomPos = null

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
        document.addEventListener('scroll', checkLongReadBottomPos)
    }

    const closeLongRead = () => {
        window.scrollTo(0, initialBottomPos)
        openButton.removeAttribute('style')
        document.removeEventListener('scroll', checkLongReadBottomPos)
    }

    openButton.addEventListener('click', () => {
        initialBottomPos = initialBottomPos || 
                           longReadContainer.parentElement.getBoundingClientRect().bottom + document.documentElement.scrollTop - document.documentElement.clientHeight

        openButton.classList.contains('opened')
        ? closeLongRead()
        : openLongRead()

        openButton.classList.toggle('opened')
        longReadContainer.classList.toggle('opened')
    })
})