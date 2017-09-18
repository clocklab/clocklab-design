document.addEventListener('DOMContentLoaded', () => {
 
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
