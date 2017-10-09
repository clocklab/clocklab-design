const openBtn = document.querySelector('.open-form'),
      closeBtn = document.querySelector('.close-form'),
      form = document.querySelector('.form')
      animationTime = 700;

openBtn.addEventListener('click', () => {
    form.classList.add('opened')
})

closeBtn.addEventListener('click', () => {
    event.preventDefault()
    form.classList.remove('opened')
})

const inputs = document.querySelectorAll('input'),
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