document.addEventListener('DOMContentLoaded', () => {

    const openBtn = document.querySelector('.discuss .open-form'),
          closeBtn = document.querySelector('.back-layer .close-form'),
          frontLayer = document.querySelector('.front-layer'),
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


    openBtn.addEventListener('click', () => {
        const currentTopPos = document.documentElement.scrollTop
        const wantedTopPos = frontLayer.getBoundingClientRect().top

        ourWorks.classList.add('opened')
        ourWorks.style.perspective = '800px'

        animate((timePassed) => {
            document.documentElement.scrollTop = currentTopPos + timePassed / (scrollTime / wantedTopPos)
        }, scrollTime)
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
})