document.addEventListener('DOMContentLoaded', () => {
    const topPanel = document.querySelector('.top-panel')
    const delay = 500
    let freezer

    document.addEventListener('scroll', () => {
        document.documentElement.scrollTop !== 0 || document.body.scrollTop !== 0
        ? !topPanel.classList.contains('scrolled') && topPanel.classList.add('scrolled')
        : topPanel.classList.contains('scrolled') && topPanel.classList.remove('scrolled')
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