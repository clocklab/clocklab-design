document.addEventListener('DOMContentLoaded', () => {
    const openClose = document.querySelector('.menu__item--open-close'),
          menu = document.querySelector('.menu'),
          menuItems = document.querySelectorAll('.menu__item')

    openClose.addEventListener('click', event => {
        event.preventDefault()
        menu.classList.toggle('opened')
    })
})