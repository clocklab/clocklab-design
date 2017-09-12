const openBtn = document.querySelector('.questions .open-form'),
      closeBtn = document.querySelector('.questions .close-form'),
      frontLayer = document.querySelector('.front-layer')

openBtn.addEventListener('click', () => frontLayer.classList.add('.opened'))
closeBtn.addEventListener('click', () => frontLayer.classList.remove('.opened'))