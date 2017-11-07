document.addEventListener('DOMContentLoaded', () => {
    const topPanel = document.querySelector('.top-panel')
    const blocks = document.querySelectorAll('.global-container > div');
    const delay = 500

    document.addEventListener('scroll', () => {
        document.documentElement.scrollTop !== 0 || document.body.scrollTop !== 0
        ? !topPanel.classList.contains('scrolled') && topPanel.classList.add('scrolled')
        : topPanel.classList.contains('scrolled') && topPanel.classList.remove('scrolled')

        blocks.forEach(block => {
            if (block.getBoundingClientRect().top <= 0 && block.getBoundingClientRect().bottom <= 0) {
                const background = getComputedStyle(slides[index]).backgroundColor.replace(/rgba?|\(|\)/g, '').split(', ')

                background.filter(number => number < 100).length
                ? topPanel.classList.remove('dark')
                : topPanel.classList.add('dark')
            } 
        })
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