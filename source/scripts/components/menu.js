document.addEventListener('DOMContentLoaded', () => {
    const openCloseBtns = document.querySelectorAll('.menu__item--open-close'),
          animationTime = 1600

    function openMenu (event) {
        event.preventDefault()

        const menu = this.parentElement
        const menuBackground = menu.querySelector('.menu__background')

        menu.classList.add('opened')
        document.body.style.overflow = 'hidden'

        this.removeEventListener('click', openMenu)

        function closeMenu (event) {
            event.preventDefault()
    
            menu.classList.remove('opened')
            menuBackground.removeEventListener('click', closeMenu)
            this.removeEventListener('click', closeMenu)
            document.body.removeAttribute('style')
    
            setTimeout(() => {
                this.addEventListener('click', openMenu)
            }, animationTime)
        }
        
        setTimeout(() => {
            this.addEventListener('click', closeMenu)
            menuBackground.addEventListener('click', closeMenu)
        }, animationTime)
    }

    openCloseBtns.forEach(openCloseBtn => {
        openCloseBtn.addEventListener('click', openMenu)  
    })
});