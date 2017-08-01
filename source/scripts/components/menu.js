document.addEventListener('DOMContentLoaded', () => {
    const openCloseBtn = document.querySelector('.menu__item--open-close'),
          menu = document.querySelector('.menu'),
          menuItems = document.querySelectorAll('.menu__item'),
          menuBackground = document.querySelector('.menu__background'),
          animationTime = 1600

    const closeMenu = event => {
        event.preventDefault()
        menu.classList.remove('opened')
        menuBackground.removeEventListener('click', closeMenu)
        openCloseBtn.removeEventListener('click', closeMenu)

        setTimeout(() => {
            openCloseBtn.addEventListener('click', openMenu)
        }, animationTime)
    }

    const openMenu = event => {
        event.preventDefault()
        menu.classList.add('opened')
        openCloseBtn.removeEventListener('click', openMenu)

        setTimeout(() => {
            openCloseBtn.addEventListener('click', closeMenu)
            menuBackground.addEventListener('click', closeMenu)
        }, animationTime)
    }

    openCloseBtn.addEventListener('click', openMenu)
})