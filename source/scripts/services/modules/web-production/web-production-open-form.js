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

    const inputs = document.querySelectorAll('.back-layer input'),
          textarea = document.querySelector('.back-layer textarea')

    const checkEmptyField = field => {
        field.value.trim()
        ? field.classList.add('filled')
        : field.classList.remove('filled')

        field.parentElement.classList.remove('wrong')
    }

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            checkEmptyField(input)
        })
    })

    textarea.addEventListener('blur', () => {
        checkEmptyField(textarea)
    })
})