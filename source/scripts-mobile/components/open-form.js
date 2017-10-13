function openForm() {
    const openBtns = document.querySelectorAll('.open-form'),
          messages = {
             empty: 'данное поле не должно быть пустым',
             wrongFormat: 'номер телефона не должен содержать букв'
          }

    openBtns.forEach(openBtn => {
        const form = document.querySelector(`.form--${openBtn.dataset.formId}`),
              closeBtn = form.querySelector('.close-form'),
              inputs = form.querySelectorAll('input'),
              nameLabel = form.querySelector('.name'),
              nameInput = nameLabel.querySelector('input'),
              nameMessage = nameLabel.querySelector('.message'),
              numberLabel = form.querySelector('.number'),
              numberInput = numberLabel.querySelector('input'),
              numberMessage = numberLabel.querySelector('.message'),
              sendBtn = form.querySelector('.send')

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

        openBtn.addEventListener('click', () => {
            form.classList.add('opened')
        })
    
        closeBtn.addEventListener('click', () => {
            event.preventDefault()
            form.classList.remove('opened')
        })
    })    
}

openForm()