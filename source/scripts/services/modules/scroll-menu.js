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
})