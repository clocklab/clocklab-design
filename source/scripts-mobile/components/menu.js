document.addEventListener('DOMContentLoaded', () => {

    const openCloseBtn = document.querySelector('.menu__item--open-close'),
          animationTime = 2000,
          events = ['wheel', 'keydown', 'scroll']

    function preventScroll(event) {
        event.stopPropagation()
    }

    function openMenu (event) {
        event.preventDefault()

        function closeMenu (event) {
            event.preventDefault()
    
            menu.classList.remove('opened')
            this.removeEventListener('click', closeMenu)
            document.body.removeAttribute('style')
    
            setTimeout(() => {
                this.addEventListener('click', openMenu)
                events.forEach(event => {
                    menu.removeEventListener(event, preventScroll)
                })
            }, animationTime)
        }

        const menu = this.parentElement

        menu.classList.add('opened')
        document.body.style.overflow = 'hidden'

        this.removeEventListener('click', openMenu)

        events.forEach(event => {
            menu.addEventListener(event, preventScroll)
        })

        setTimeout(() => {
            this.addEventListener('click', closeMenu)
        }, animationTime)
    }

    openCloseBtn.addEventListener('click', openMenu)  
});