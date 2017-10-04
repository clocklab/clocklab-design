document.addEventListener('DOMContentLoaded', () => {

    const openBtn = document.querySelector('.discuss .open-form'),
          closeBtn = document.querySelector('.back-layer .close-form'),
          frontLayer = document.querySelector('.front-layer'),
          topPanel = document.querySelector('.top-panel'),
          ourWorks = frontLayer.parentElement,
          animationTime = 700,
          scrollTime = 300

    const animate = (draw, duration) => {
        const start = performance.now();
        
        requestAnimationFrame(function animate(time) {
            let timePassed = time - start;
        
            timePassed = timePassed > duration
            ? duration
            : timePassed
        
            draw(timePassed);
        
            timePassed < duration &&
            requestAnimationFrame(animate)
        });
    }

    const checkFormPos = () => {
        const frontLayerPos = frontLayer.getBoundingClientRect()

        if (frontLayerPos.bottom <= 0 || frontLayerPos.top >= document.documentElement.offsetHeight) {
            closeForm()
        }
    }

    const closeForm = () => {
        event.preventDefault()

        ourWorks.classList.remove('opened')

        setTimeout(() => {
            ourWorks.removeAttribute('style')
        }, animationTime)

        topPanel.classList.remove('form-opened')
        document.removeEventListener('scroll', checkFormPos)
    }

    openBtn.addEventListener('click', () => {
        const currentTopPos = document.documentElement.scrollTop
        const wantedTopPos = frontLayer.getBoundingClientRect().top

        ourWorks.classList.add('opened')
        ourWorks.style.perspective = '800px'

        animate((timePassed) => {
            document.documentElement.scrollTop = currentTopPos + timePassed / (scrollTime / wantedTopPos)
        }, scrollTime)

        topPanel.classList.add('form-opened')
        document.addEventListener('scroll', checkFormPos)
    })

    closeBtn.addEventListener('click', closeForm)

    const inputs = document.querySelectorAll('.back-layer input'),
          numberInput = document.querySelector('.back-layer .phone > input'),
          nameInput = document.querySelector('.back-layer .name > input'),
          sendBtn = document.querySelector('form .send'),
          messages = {
              empty: 'данное поле не должно быть пустым',
              wrongFormat: 'номер телефона не должен содержать букв'
          }

    sendBtn.addEventListener('click', event => {
        
        if (/[а-яА-Яё-їЁ-ЇЄ-єІ-іa-zA-Z]/.test(numberInput.value.trim())) {
            numberInput.classList.add('wrong')
        }

    })

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            input.value.trim()
            ? input.classList.add('filled')
            : input.classList.remove('filled')
        })
    })
})