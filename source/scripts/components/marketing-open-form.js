const openBtn = document.querySelector('.questions .open-form'),
      closeBtn = document.querySelector('.back-layer .close-form'),
      brand = document.querySelector('.marketing-brand'),
      menu = document.querySelector('.front-layer .menu'),
      animationTime = 700;

openBtn.addEventListener('click', () => {
    brand.classList.add('opened')
    menu.style.perspective = '10px'
    brand.style.perspective = '800px'
})

closeBtn.addEventListener('click', () => {
    event.preventDefault()

    brand.classList.remove('opened')

    setTimeout(() => {
        menu.removeAttribute('style')
        brand.removeAttribute('style')
    }, animationTime)
})