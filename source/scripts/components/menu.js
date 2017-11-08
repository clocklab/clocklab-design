document.addEventListener('DOMContentLoaded', () => {
    const openCloseBtns = document.querySelectorAll('.menu__item--open-close'),
          animationTime = 2200,
          events = ['wheel', 'keydown', 'scroll']
          needScrolledClass = false

    function preventScroll(event) {
        event.stopPropagation()
    }

    function openMenu(event) {
        event.preventDefault()

        function closeMenu(event) {
            event.preventDefault()
    
            menu.classList.remove('opened')
            menuBackground.removeEventListener('click', closeMenu)
            this.removeEventListener('click', closeMenu)

            setTimeout(() => {
                document.body.removeAttribute('style')
                this.addEventListener('click', openMenu)
                needScrolledClass && menu.classList.add('scrolled')
                events.forEach(event => {
                    menu.removeEventListener(event, preventScroll)
                })
            }, animationTime)
        }

        const menu = this.parentElement
        const menuBackground = menu.querySelector('.menu__background')

        menu.classList.add('opened')
        document.body.style.overflow = 'hidden'

        if (menu.classList.contains('scrolled')) {
            needScrolledClass = true
            menu.classList.remove('scrolled')
        }

        events.forEach(event => {
            menu.addEventListener(event, preventScroll)
        })

        this.removeEventListener('click', openMenu)

        setTimeout(() => {
            this.addEventListener('click', closeMenu)
            menuBackground.addEventListener('click', closeMenu)
        }, animationTime)
    }

    openCloseBtns.forEach(openCloseBtn => {
        openCloseBtn.addEventListener('click', openMenu)  
    })
});