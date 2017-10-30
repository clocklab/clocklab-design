const answers = () => {
    const btns = document.querySelectorAll('.answers .list-item-title')
    const animationTime = 300

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

    const openAnswer = (textContainer) => {
        animate((timePassed) => {
            textContainer.style.height = `${timePassed * textContainer.firstElementChild.offsetHeight / animationTime}px`
        }, animationTime)
    }

    const closeAnswer = (textContainer) => {
        animate((timePassed) => {
            textContainer.style.height = `${parseInt(textContainer.style.height) - timePassed * parseInt(textContainer.style.height) / animationTime}px`
        }, animationTime)
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.contains('active')
            ? closeAnswer(btn.nextElementSibling)
            : openAnswer(btn.nextElementSibling)

            btn.classList.toggle('active')
        })
    })
}

answers()