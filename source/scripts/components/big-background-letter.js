document.addEventListener('DOMContentLoaded', () => {
    const selectors = ['.euro-club', '#clock', '#service-two', '#blog-two', '#blog-three', '#main-contacts']

    const move = selectors => {

        selectors.forEach(selector => {

            const parent = document.querySelector(selector),
                  letter = document.querySelector(`${selector} .big-background-letter`),
                  koef = 10

            parent && parent.addEventListener('mousemove', event => {
                const allHeight = document.documentElement.clientHeight,
                      allWidth = document.documentElement.clientWidth,
                      currentXPos = event.clientX,
                      currentYPos = event.clientY

                const newX = - (allWidth / 2 - currentXPos) / koef,
                      newY = - (allHeight / 2 - currentYPos) / koef

                letter.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
            })
        })
    }

    move(selectors)
})