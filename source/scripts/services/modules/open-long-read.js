const openButton = document.querySelector('.open-long-read')
const closeButtons = document.querySelectorAll('.close-long-read')
const longRead = document.querySelector('.long-read')
const tagretObjecSizes = document.querySelector('[data-target-long-read="true"]').getBoundingClientRect()
const background = document.querySelector('.long-read-background')
const animationTimeBackground = 500


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

openButton.addEventListener('click', () => {
    const percentage = Math.round(tagretObjecSizes.bottom / document.body.offsetHeight * 100) 

    background.style.top = `${percentage}%`
    
    longRead.classList.add('opened')

    animate((timePassed) => {
        background.style.top = `${percentage - timePassed / (animationTimeBackground / percentage)}%`
        background.style.height = `${timePassed / (animationTimeBackground / 100)}%`
    }, animationTimeBackground)

    setTimeout(() => {
        var wow = new WOW(
            {
              scrollContainer: '.long-read'
            }
        );
        wow.init();
    }, animationTimeBackground)
})

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        longRead.classList.remove('opened')
        background.removeAttribute('style')
    })
})

longRead.addEventListener('scroll', event => {
    event.stopPropagation()
})

longRead.addEventListener('wheel', event => {
    event.stopPropagation()
})