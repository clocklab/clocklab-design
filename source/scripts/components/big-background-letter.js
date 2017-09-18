document.addEventListener('DOMContentLoaded', () => {
    const selectors = ['.euro-club', '#clock', '#service-two', '#blog-two', '#blog-three', '#main-contacts', '#contacts', '#services', '#about-company-four', '#design-one', '#design-three']

    const move = () => {
        const letters = document.querySelectorAll('.big-background-letter'),
              koef = 10

        document.addEventListener('mousemove', event => {
            const allHeight = document.documentElement.clientHeight,
                  allWidth = document.documentElement.clientWidth,
                  currentXPos = event.clientX,
                  currentYPos = event.clientY
                  
            const newX = - (allWidth / 2 - currentXPos) / koef,
                  newY = - (allHeight / 2 - currentYPos) / koef

            letters.forEach(letter => letter.style.transform = `translate3d(${newX}px, ${newY}px, 0)`)
        })
    }

    move()
})