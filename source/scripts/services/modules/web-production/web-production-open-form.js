document.addEventListener('DOMContentLoaded', () => {

    const openBtn = document.querySelector('.open-form'),
          closeBtn = document.querySelector('.back-layer .close-form'),
          frontLayer = document.querySelector('.front-layer'),
          menu = document.querySelector('.menu'),
          logo = document.querySelector('.logo'),
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

    const closeForm = event => {
        event && event.preventDefault()

        ourWorks.classList.remove('opened')

        setTimeout(() => {
            ourWorks.removeAttribute('style')
        }, animationTime)

        menu && menu.classList.remove('form-opened')
        logo && logo.classList.remove('form-opened')
        document.removeEventListener('scroll', checkFormPos)
    }

    openBtn.addEventListener('click', (event) => {
        event && event.preventDefault()
        
        const currentTopPos = document.documentElement.scrollTop || document.body.scrollTop
        const wantedTopPos = frontLayer.getBoundingClientRect().top

        ourWorks.classList.add('opened')
        ourWorks.style.perspective = '800px'

        animate((timePassed) => {
            document.documentElement.scrollTop = currentTopPos + timePassed / (scrollTime / wantedTopPos)
            document.body.scrollTop = currentTopPos + timePassed / (scrollTime / wantedTopPos)
        }, scrollTime)

        menu && menu.classList.add('form-opened')
        logo && logo.classList.add('form-opened')

        setTimeout(() => {
            document.addEventListener('scroll', checkFormPos)
        }, scrollTime)
    })

    closeBtn.addEventListener('click', closeForm)

    const form = document.querySelector('.back-layer form'),
          inputs = document.querySelectorAll('.back-layer input'),
          nameLabel = form.querySelector('.name'),
          nameInput = nameLabel.querySelector('input'),
          nameMessage = nameLabel.querySelector('.message'),
          numberLabel = form.querySelector('.number'),
          numberInput = numberLabel.querySelector('input'),
          numberMessage = numberLabel.querySelector('.message'),
          sendBtn = document.querySelector('form .send'),
          messages = {
              empty: 'данное поле не должно быть пустым',
              wrongFormat: 'номер телефона не должен содержать букв'
          }


    sendBtn.addEventListener('click', event => {
        event.preventDefault()
        
        const numberValue = numberInput.value.trim(),
              nameValue = nameInput.value.trim()

        if (/[а-яА-Яё-їЁ-ЇЄ-єІ-іa-zA-Z]/.test(numberValue) || !numberValue) {
            numberLabel.classList.add('wrong')

            numberMessage.innerText = !numberValue
            ? messages.empty
            : messages.wrongFormat
        } else {
            numberLabel.classList.remove('wrong')
            numberMessage.innerText = ''
        }

        if (!nameValue) {
            nameLabel.classList.add('wrong')
            nameMessage.innerText = messages.empty
        } else {
            nameLabel.classList.remove('wrong')
            nameMessage.innerText = ''
        }

        const wrongFields = form.querySelectorAll('.wrong')

        wrongFields.length
        ? wrongFields[0].querySelector('input').focus()
        : form.submit()
    })

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            input.value.trim()
            ? input.classList.add('filled')
            : input.classList.remove('filled')

            input.parentElement.classList.remove('wrong')
        })
    })
})