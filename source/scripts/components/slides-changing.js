document.addEventListener('DOMContentLoaded', () => {
    
    const slides = Array.prototype.slice.call( document.querySelectorAll('.screen-block'))
    const events = [/*'wheel', 'scroll',*/ 'keydown']
    const animationTime = 1000
    
    const removeListeners = () => events.forEach(event => document.removeEventListener(event, move))
    
    const addListeners = () => events.forEach(event => document.addEventListener(event, move))
    
    const moveToNext = index => {
        removeListeners()
    
        slides[index + 1]
        ? slides[index + 1].classList.add('current') 
        : slides[0].classList.add('current')
    
        setTimeout(addListeners, animationTime)
    }
    
    const moveToPrevious = (index) => {
        removeListeners()
    
        slides[index - 1]
        ? slides[index - 1].classList.add('current')
        : slides[slides.length - 1].classList.add('current')
    
        setTimeout(addListeners, animationTime)
    }
    
    const move = () => {
        const previousSlide = document.querySelector('.previous');
        const currentSlide = document.querySelector('.current');
        const index = slides.indexOf(currentSlide);
    
        previousSlide && previousSlide.classList.remove('previous');
        currentSlide.classList.remove('current');
        currentSlide.classList.add('previous');  
    
        (event.deltaY < 0 || event.keyCode === 40) && moveToNext(index);
        (event.deltaY > 0 || event.keyCode === 38) && moveToPrevious(index);
    }
    
    addListeners()
    
    slides[0].classList.add('current')
    
})