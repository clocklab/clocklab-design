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


    if (localStorage.getItem('position')) {
        const imageContainer = document.querySelector('.post .image-container')
        const image = imageContainer.querySelector('img')
        const dataFrom = JSON.parse(localStorage.getItem('position'))
        const dataTo = imageContainer.getBoundingClientRect()
        const animationTime = 900

        imageContainer.classList.add('active')

        // image.style.cssText = `
        //     position: fixed,
        //     left: ${dataFrom.left}px,
        //     top: ${dataFrom.top}px,
        //     width: ${dataFrom.width}px,
        //     height: ${dataFrom.height}px
        // `

        image.style.position = 'fixed'
        image.style.left = `${dataFrom.left}px`
        image.style.top = `${dataFrom.top}px`      
        image.style.width = `${dataFrom.width}px`
        image.style.height = `${dataFrom.height}px`      

        animate((timePassed) => {
            image.style.left = `${dataFrom.left + timePassed / (animationTime / (dataTo.left - dataFrom.left))}px`
            image.style.top = `${dataFrom.top + timePassed / (animationTime / (dataTo.top - dataFrom.top))}px`
            image.style.width = `${dataFrom.width + timePassed / (animationTime / (dataTo.width - dataFrom.width))}px`
            image.style.height = `${dataFrom.height + timePassed / (animationTime / (dataTo.height - dataFrom.height))}px`
        }, animationTime)

        setTimeout(() => {
            image.removeAttribute('style')
            localStorage.clear()
        }, animationTime + 100)
    }
})