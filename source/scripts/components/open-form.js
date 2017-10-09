const openBtn = document.querySelector('.questions .open-form'),
      closeBtn = document.querySelector('.back-layer .close-form'),
      workFlow = document.querySelector('.work-flow, #seo-three, #design-three'),
      menu = document.querySelector('.front-layer .menu'),
      animationTime = 700;

openBtn.addEventListener('click', () => {
    workFlow.classList.add('opened')
    menu.style.perspective = '10px'
    workFlow.style.perspective = '800px'
})

closeBtn.addEventListener('click', () => {
    event.preventDefault()

    workFlow.classList.remove('opened')

    setTimeout(() => {
        menu.removeAttribute('style')
        workFlow.removeAttribute('style')
    }, animationTime)
})