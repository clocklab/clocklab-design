const openBtn = document.querySelector('.discuss .open-form'),
      closeBtn = document.querySelector('.back-layer .close-form'),
      ourWorks = document.querySelector('.design-our-works'),
      animationTime = 700;

openBtn.addEventListener('click', () => {
    ourWorks.classList.add('opened')
    ourWorks.style.perspective = '800px'
})

closeBtn.addEventListener('click', () => {
    event.preventDefault()

    ourWorks.classList.remove('opened')

    setTimeout(() => {
        ourWorks.removeAttribute('style')
    }, animationTime)
})

const inputs = document.querySelectorAll('.back-layer input')

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        input.value.trim()
        ? input.classList.add('filled')
        : input.classList.remove('filled')
    })
})