document.addEventListener('DOMContentLoaded', () => {
    const topPanel = document.querySelector('.top-panel')
    const delay = 500
    let freezer

    document.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop !== 0 || document.body.scrollTop !==0) {
            !topPanel.classList.contains('active') && topPanel.classList.add('active')
            !topPanel.classList.contains('scrolled') && topPanel.classList.add('scrolled')

            freezer && clearTimeout(freezer)
            freezer = setTimeout(() => {
                topPanel.classList.remove('scrolled')
            }, delay)
        } else {
            topPanel.classList.contains('active') && topPanel.classList.remove('active', 'scrolled')
        }
    })

    // setTopPanelStyle = () => {
    //     const firstBlock = 
    //     const background = getComputedStyle(slides[index]).backgroundColor.replace(/rgb|rgba|\(|\)/g, '').split(', ')

    //     setTimeout(() => {
    //         background.filter(number => number < 100).length
    //         ? topPanel.classList.remove('dark')
    //         : topPanel.classList.add('dark')
    //     }, animationDeltaTime)
    // }
})