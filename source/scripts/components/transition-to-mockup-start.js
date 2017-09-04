document.addEventListener('DOMContentLoaded', () => {
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

    const links = document.querySelectorAll('.portfolio .front-layer .image-container')
    const animationTime = 900

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault()
            
            const href = link.getAttribute('href')
            const image = link.firstElementChild
            const topPos = image.getBoundingClientRect().top / document.body.clientHeight * 100
            const leftPos = image.getBoundingClientRect().left / document.body.clientWidth * 100

            image.style.top = `${topPos}%`
            image.style.left = `${leftPos}%`

            localStorage.setItem('position', JSON.stringify(
                {
                    'left': document.body.clientWidth * 0.25,
                    'top': document.body.clientHeight * 0.25,
                    'width': document.body.clientWidth / 2,
                    'height': document.body.clientHeight / 2
                }
            ))

            link.classList.add('active')
            link.parentElement.parentElement.style.zIndex = '9999'

            animate((timePassed) => {
                image.style.top = `${topPos + timePassed / (animationTime / (25 - topPos))}%`
                image.style.left = `${leftPos + timePassed / (animationTime / (25 - leftPos))}%`
            }, animationTime)

            setTimeout(() => {
                document.location.href = href
            }, animationTime + 100)
        })
    })
})